from flask import Flask, jsonify, request
# del modulo flask importar la clase Flask y los métodos jsonify,request
import json  #Lo importo para ruta de solicitudes Options
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask import send_from_directory, render_template #Agrego: para ruta raiz y favicon



app=Flask(__name__)  # crear el objeto app de la clase Flask
app.static_folder = 'static'# Agregado por ESMN: para guardar archivos estaticos como CSS, img, JS  Forma de llamar desde la carpeta. Ej. <img src="{{ url_for('static', filename='img/mi_imagen.jpg') }}" alt="Mi Imagen">
#Las siguientes son para el login y manejo de sesiones
#app.debug = True
 #modulo cors es para que me permita acceder desde el frontend al backend
# CORS(app) me tira error en Options, creo ruta e utilizo credenciales(cookies)
CORS(app, supports_credentials=True,origins="*")

# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://papeleraZarate:Fjg96P7U@papeleraZarate.mysql.pythonanywhere-services.com/papeleraZarate$proyecto'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow


#---------------------------MODELOS DE LA BD-------------------------------
# defino la tabla
class Producto(db.Model):   # la clase Producto hereda de db.Model. Comentario agregado por ESMN:Al heredar de db.Model, estás diciendo a SQLAlchemy que esta clase debe considerarse como un modelo que se mapeará a una tabla en la base de datos.
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), unique=True)
    precio = db.Column(db.Float)
    fecha = db.Column(db.String(10))
    barra = db.Column(db.String(100))
    unidadpaquete = db.Column(db.Integer)
    unidadcaja = db.Column(db.Integer)
    preciounitario = db.Column(db.Float)
    conutilidad = db.Column(db.Float)
    categoria = db.Column(db.String(50))
    stock = db.Column(db.Integer)
    imagen = db.Column(db.String(400))


    def __init__(self, nombre, precio, fecha, barra, unidadpaquete, unidadcaja, preciounitario, conutilidad, categoria, stock, imagen):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.precio = precio
        self.fecha = fecha
        self.barra = barra
        self.unidadpaquete = unidadpaquete
        self.unidadcaja = unidadcaja
        self.preciounitario = preciounitario
        self.conutilidad = conutilidad
        self.categoria = categoria
        self.stock = stock
        self.imagen = imagen




class Persona(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    direccion = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    correo_electronico = db.Column(db.String(50), nullable=False, unique=True)
    nombre_usuario = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)
    rol = db.Column(db.String(20), nullable=False, default='cliente')




    def __init__(self, nombre, direccion=None, telefono=None, correo_electronico=None, nombre_usuario=None, password=None, rol='cliente'):
        self.nombre = nombre
        self.direccion = direccion
        self.telefono = telefono
        self.correo_electronico = correo_electronico
        self.nombre_usuario = nombre_usuario
        self.password = password
        self.rol = rol




with app.app_context():
    db.create_all()  # aqui crea todas las tablas Comentario ESMN:Puedes crear las tablas en la base de datos basadas en tus modelos utilizando este comando.
#  *************************************************************************
#----------------------------ESQUEMA DE MARSHMALLOW----------------------------
class ProductoSchema(ma.Schema):
    class Meta:
          fields = ('id', 'nombre', 'precio', 'fecha', 'barra', 'unidadpaquete', 'unidadcaja', 'preciounitario', 'conutilidad', 'categoria', 'stock', 'imagen')
class ProductoCarritoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'precio', 'categoria', 'imagen')

class ProductoMasInfoSchema(ma.Schema):
    class Meta:
        fields= ('id', 'nombre','fecha', 'barra', 'unidadpaquete', 'unidadcaja', 'preciounitario', 'conutilidad')

producto_schema=ProductoSchema()            # El objeto producto_schema es para traer un producto
productos_schema=ProductoSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto

producto_carrito_schema = ProductoCarritoSchema()
productos_carrito_schema = ProductoCarritoSchema(many=True)

producto_mas_info_schema=ProductoMasInfoSchema()


class PersonaSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'direccion', 'telefono', 'correo_electronico','nombre_usuario','password','rol')

persona_schema = PersonaSchema()
personas_schema = PersonaSchema(many=True)






'''ESMN
Esquema de Marshmallow (ProductoSchema):
En tu esquema de Marshmallow, defines todos los campos del modelo, pero luego puedes especificar los campos que deseas incluir o excluir cuando serializas o deserializas datos:

codigo python

from marshmallow import Schema, fields

class ProductoSchema(Schema):
    class Meta:
        fields = ('id', 'nombre', 'precio', 'stock', 'imagen')

         Otra forma es al importar fields desde MArshmallow, usar asi:
      from marshmallow import Schema, fields

      class ProductoSchema(Schema):
          id = fields.Integer()
          nombre = fields.String()
          precio = fields.Float()
          stock = fields.Integer()
          imagen = fields.String()

    # Puedes agregar otros campos aquí si necesitas deserializarlos

# Para incluir solo ciertos campos en la serialización
producto_schema = ProductoSchema(only=('id', 'nombre', 'precio'))

# Para excluir ciertos campos en la serialización
producto_schema_excluir = ProductoSchema(exclude=('stock', 'imagen'))
En este ejemplo, only se utiliza para incluir solo ciertos campos en la serialización, y exclude se utiliza para excluir ciertos campos. Puedes ajustar esto según tus necesidades y decidir dinámicamente qué campos incluir o excluir en función del contexto de tu aplicación.

Entonces, cuando necesitas renderizar productos en tu página web, puedes utilizar el esquema apropiado para seleccionar los campos específicos que deseas mostrar. Esto te proporciona flexibilidad para trabajar con toda la estructura de tu modelo de base de datos, pero solo mostrar la información relevante en la interfaz de usuario.

OTRO TEMA ES LA LINEA :
productos_schema = ProductoSchema(many=True)
se refiere a la creación de una instancia del esquema ProductoSchema con el parámetro many=True. Este parámetro se utiliza cuando estás tratando con colecciones de objetos en lugar de un solo objeto.

En el contexto de Flask y SQLAlchemy, esto es comúnmente utilizado cuando deseas serializar o deserializar una lista de objetos del modelo Producto. Aquí hay un ejemplo de cómo podría ser usado:

python
Copy code
productos = Producto.query.all()
resultado = productos_schema.dump(productos)
En este ejemplo:

Producto.query.all() recupera todos los registros de la tabla Producto de la base de datos.

productos_schema.dump(productos) utiliza el esquema ProductoSchema para serializar la lista de productos en un formato que puede ser enviado como respuesta de una API, por ejemplo.

El parámetro many=True indica a Marshmallow que está tratando con una colección, y debe aplicar las reglas de serialización/deserialización para múltiples objetos en lugar de uno solo.

En resumen, cuando estás trabajando con una colección de objetos, como una lista de productos, debes utilizar many=True en tu esquema para manejar adecuadamente la serialización o deserialización de múltiples instancias del modelo.

'''
#----------------------------------CONTROLADORES-------------------------------------
#-----------------PRODUCTOS-------------------------------------------------------
# crea los endpoint o rutas (json)
@app.route('/gestionProductos',methods=['GET'])
def get_Productos():
    try:
        all_productos=Producto.query.all()         # el metodo query.all() lo hereda de db.Model
        if not all_productos:
                # Si no hay productos, devuelve una respuesta con código 404 Not Found
                print("No se encontraron productos en la base de datos.")

                return jsonify({'error': 'No se encontraron productos'}), 404

            # Serializa la lista de productos y devuelve la respuesta exitosa
        result = productos_schema.dump(all_productos)
        # print(f"Productos encontrados: {result}")Veo todos en la terminal.
        return jsonify(result)

    except Exception as e:
        # Maneja cualquier otro error interno del servidor
        print(f"Error al obtener productos: {e}")
        return jsonify({'error': 'Error interno del servidor'}), 500

#  #dump - Serialización:
# dump se utiliza para convertir un objeto Python en un formato serializado, como JSON. Se utiliza cuando deseas enviar datos como respuesta a una solicitud.
# load - Deserialización:
# data = {'nombre': 'Producto1', 'descripcion': 'Descripción del producto', 'subtipo': 1, 'precio': 20, 'stock': 50, 'foto': 'imagen.jpg'}
# new_producto = producto_schema.load(data)

# load se utiliza para convertir datos en formato JSON a objetos Python. Se utiliza cuando recibes datos JSON en una solicitud y deseas convertirlos en objetos que puedas manipular en tu aplicación.





@app.route('/gestionProductos/<id>',methods=['GET'])
def get_producto(id):
    print("Recibida una solicitud GET a /gestionProductos")
    try:
        producto = db.session.get(Producto,id)
        if producto:
            # Si el producto existe, devuelve la respuesta exitosa
            print(f"Producto encontrado: {producto}")
            return producto_schema.jsonify(producto)
        else:
            # Si el producto no existe, devuelve una respuesta de error con el código 404 Not Found
            print(f"Producto no encontrado para el ID: {id}")
            return jsonify({'error': 'Producto no encontrado'}), 404

    except Exception as e:
        # Maneja cualquier otro error
        print(f"Error en la obtención del producto: {e}")
        return jsonify({'error': 'Error interno del servidor'}), 500




@app.route('/gestionProductos', methods=['POST'])
def create_producto():
    try:
        json_data = request.json
        if json_data is None:
            return jsonify({'error': 'Datos JSON no proporcionados'}), 400

        required_fields = ['nombre', 'precio', 'fecha', 'barra', 'unidadpaquete', 'unidadcaja', 'preciounitario', 'conutilidad', 'categoria', 'stock', 'imagen']

        for field in required_fields:
            if field not in json_data:
                return jsonify({'error': f'Campo faltante en la solicitud: {field}'}), 400

        print(json_data)

        nombre = json_data['nombre']
        precio = json_data['precio']
        fecha = json_data['fecha']
        barra = json_data['barra']
        unidadpaquete = json_data['unidadpaquete']
        unidadcaja = json_data['unidadcaja']
        preciounitario = json_data['preciounitario']
        conutilidad = json_data['conutilidad']
        categoria = json_data['categoria']
        stock = json_data['stock']
        imagen = json_data['imagen']

        new_producto = Producto(nombre, precio, fecha, barra, unidadpaquete, unidadcaja, preciounitario, conutilidad, categoria, stock, imagen)

        print(f"Agregando nuevo producto a la sesión: {new_producto.__dict__}")
        db.session.add(new_producto)
        db.session.commit()

        print(f"Producto creado: {new_producto}")

        return producto_schema.jsonify(new_producto), 201

    except KeyError as e:
        return jsonify({'error': 'Faltan campos en la solicitud'}), 400

    except Exception as e:
        print(f"Error en la creación de producto: {e}")
        return jsonify({'error': f'Error interno del servidor: {str(e)}'}), 500


@app.route('/gestionProductos/<id>',methods=['PUT'])
def update_producto(id):
    try:
        producto = db.session.get(Producto,id)

        if producto is None:
            return jsonify({'error': 'Producto no encontrado'}), 404

        # Actualizar cada campo si está presente en el JSON, de lo contrario, mantener el valor actual
        producto.nombre = request.json.get('nombre', producto.nombre)
        producto.precio = request.json.get('precio', producto.precio)
        producto.fecha = request.json.get('fecha', producto.fecha)
        producto.barra = request.json.get('barra', producto.barra)
        producto.unidadcaja = request.json.get('unidadcaja', producto.unidadcaja)
        producto.unidadpaquete = request.json.get('unidadpaquete', producto.unidadpaquete)
        producto.preciounitario = request.json.get('preciounitario', producto.preciounitario)
        producto.conutilidad = request.json.get('conutilidad', producto.conutilidad)
        producto.categoria = request.json.get('categoria', producto.categoria)
        producto.stock = request.json.get('stock', producto.stock)
        producto.imagen = request.json.get('imagen', producto.imagen)

        db.session.commit()

        # Devuelve la respuesta con el producto actualizado y el código 200 OK
        print(f"Producto actualizado: {producto}")
        return jsonify({
            'id': producto.id,
            'nombre': producto.nombre,
            'precio': producto.precio,
            'fecha': producto.fecha,
            'barra': producto.barra,
            'unidadcaja': producto.unidadcaja,
            'unidadpaquete': producto.unidadpaquete,
            'preciounitario': producto.preciounitario,
            'conutilidad': producto.conutilidad,
            'categoria': producto.categoria,
            'stock': producto.stock,
            'imagen': producto.imagen
        }), 200

    except Exception as e:
    # Maneja cualquier otro error
        print(f"Error en la actualización del producto: {e}")
        return jsonify({'error': f'Error interno del servidor: {str(e)}'}), 500







    #Si uso Usar .get() proporciona una manera más concisa de manejar la falta de un campo en el JSON y también permite especificar un valor predeterminado en caso de que el campo no esté presente.
    #En el caso de no usar .get() agregado al request.json El manejo de errores específicamente para el caso de campo faltante se vuelve más relevante cuando decides acceder directamente al campo utilizando request.json['nombre'] en lugar de .get().
    # except KeyError as ke:
    #     print(f"Campo faltante en la solicitud: {str(ke)}")
    #     return jsonify({'error': f'Campo faltante en la solicitud: {str(ke)}'}), 400





@app.route('/gestionProductos/<id>',methods=['DELETE'])
def delete_producto(id):
    try:
        producto = Producto.query.get(id)

        if producto:
            db.session.delete(producto)
            db.session.commit()
            return jsonify({'message': 'Producto eliminado exitosamente'}), 200
        else:
            return jsonify({'error': 'Producto no encontrado'}), 404

    except Exception as e:
        return jsonify({'error': 'Error interno del servidor'}), 500



# Ruta para obtener detalles específicos para el modal-Agregado
@app.route('/gestionProductos/detalles/show/<id>', methods=['GET'])
def get_detalles_producto(id):
    print("Recibida una solicitud GET a /gestionProductos/detalles")
    try:
        producto = Producto.query.get(id)
        print(f"Consulta SQL generada: {Producto.query.filter_by(id=id).statement}")
        if producto:
            # Si el producto existe, devuelve solo los detalles necesarios para el modal. Puedo crear un diccionario en la ruta o usar dump.
            # detalles_producto = {
            #     'id': producto.id,
            #     'nombre': producto.nombre,
            #     'barra': producto.barra,
            #     'categoria': producto.categoria,
            #     'unidadcaja': producto.unidadcaja,
            #     'unidadcaja': producto.unidadcaja,
            #     'unidadpaquete': producto.unidadcaja,
            #     'preciounitario': producto.unidadcaja,
            # }
            detalles_producto = producto_mas_info_schema.dump(producto)
            return jsonify(detalles_producto)
        else:
            # Si el producto no existe, devuelve una respuesta de error con el código 404 Not Found
            print(f"Producto no encontrado para el ID: {id}")
            return jsonify({'error': 'Producto no encontrado'}), 404

    except Exception as e:
        # Maneja cualquier otro error
        print(f"Error en la obtención del producto: {e}")
        return jsonify({'error': 'Error interno del servidor'}), 500


# Manejo de solicitudes OPTIONS para la ruta /gestionProductos/
@app.route('/gestionProductos/', methods=['OPTIONS'])
def handle_options():
    response = app.response_class(
        response=json.dumps({}),
        status=200,
        mimetype='application/json'
    )
    response.headers.add('Access-Control-Allow-Methods', 'PUT')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response
#************************Rutas para ShopOnline*************
@app.route('/api/productos_disponibles', methods=['GET'])
def obtener_productos_disponibles():
    try:
        productos_disponibles = Producto.query.all()

        if not productos_disponibles:
            return jsonify({'error': 'No se encontraron productos disponibles'}), 404

        resultado = productos_carrito_schema.dump(productos_disponibles)
        return jsonify({"productos_disponibles": resultado})

    except Exception as e:
        print(f"Error al obtener productos disponibles: {e}")
        return jsonify({'error': 'Error interno del servidor'}), 500
#Esta ruta renderiza los productos que se muestran en la pagina del Shop, lo cual tienen menos atributos para visualizar el cliente.


#------------------------------PERSONAS---------------------------------------
@app.route("/personas", methods=['POST'])
def registro():
    try:
        # Obtener datos JSON del cuerpo de la solicitud
        data = request.json


        nombre_recibido = data["nombre"]
        direccion_recibida = data.get("direccion", None)
        telefono_recibido = data.get("telefono", None)
        correo_recibido = data.get("correo_electronico", None)
        usuario_recibido = data.get("nombre_usuario", None)
        password_recibida = data.get("password", None)
        rol_recibido = data.get("rol", "cliente")

        # Validar que el correo electrónico no exista previamente
        if Persona.query.filter_by(correo_electronico=correo_recibido).first():
            return jsonify({"message": "Correo electrónico ya registrado. Por favor, utiliza otro."}), 400

        else:
            # Creando registro en DB -> col = valor enviado
            nuevo_registro = Persona(
                nombre=nombre_recibido,
                direccion=direccion_recibida,
                telefono=telefono_recibido,
                correo_electronico=correo_recibido,
                nombre_usuario=usuario_recibido,
                password=password_recibida,
                rol=rol_recibido,
            )

            db.session.add(nuevo_registro)
            db.session.commit()

            return jsonify({"message": "Registro grabado exitosamente"})
    except Exception as e:
        return jsonify({"message": f"Error interno en el servidor: {str(e)}"}), 500


# Retornar todos los registros en un Json
@app.route("/personas",  methods=['GET'])
def personas():
    # Consultar en la tabla todos los registros
    # all_registros -> lista de objetos
    all_registros = Persona.query.all()

    # Lista de diccionarios
    data_serializada = []

    for objeto in all_registros:
        data_serializada.append({
            "id": objeto.id,
            "nombre": objeto.nombre,
            "direccion": objeto.direccion,
            "telefono": objeto.telefono,
            "correo_electronico": objeto.correo_electronico,
            "nombre_usuario":objeto.nombre_usuario,
            "password":objeto.password,
            "rol":objeto.rol,
        })

    return jsonify(data_serializada)

@app.route('/personas/<id>', methods=['GET'])
def get_persona(id):
    persona = Persona.query.get(id)
    return persona_schema.jsonify(persona)


# Modificar un registro
@app.route('/personas/<id>', methods=['PUT'])
def update(id):
    # Buscar el registro a modificar en la tabla por su id
    update_persona = Persona.query.get(id)

    # {"nombre": "Felipe", "direccion": "Calle Principal", "telefono": "123456789", "correo_electronico": "felipe@example.com"}
    # -> input tiene el atributo name correspondiente para cada campo
    nombre = request.json["nombre"]
    direccion = request.json.get("direccion", None)
    telefono = request.json.get("telefono", None)
    correo_electronico = request.json.get("correo_electronico", None)
    nombre_usuario=request.json.get("nombre_usuario", None)
    password=request.json.get("password", None)
    rol=request.json.get("rol", None)

    update_persona.nombre = nombre
    update_persona.direccion = direccion
    update_persona.telefono = telefono
    update_persona.correo_electronico = correo_electronico
    update_persona.nombre_usuario = nombre_usuario
    update_persona.password = password
    update_persona.rol = rol

    db.session.commit()

    data_serializada = [{
        "id": update_persona.id,
        "nombre": update_persona.nombre,
        "direccion": update_persona.direccion,
        "telefono": update_persona.telefono,
        "correo_electronico": update_persona.correo_electronico,
        "nombre_usuario": update_persona.nombre_usuario,
        "password":update_persona.password,
        "rol":update_persona.rol,
    }]

    return jsonify(data_serializada)


@app.route('/personas/<id>', methods=['DELETE'])
def borrar(id):
    # Se busca a la persona por id en la DB
    delete_persona = Persona.query.get(id)

    # Se elimina de la DB
    db.session.delete(delete_persona)
    db.session.commit()

    data_serializada = [{
        "id": delete_persona.id,
        "nombre": delete_persona.nombre,
        "direccion": delete_persona.direccion,
        "telefono": delete_persona.telefono,
        "correo_electronico": delete_persona.correo_electronico,
        "nombre_usuario": delete_persona.nombre_usuario,
        "password":delete_persona.password,
        "rol":delete_persona.rol,
    }]

    return jsonify(data_serializada)



#***************************************************************
# Ruta para la URL raíz-Agregado
@app.route('/indexGestion.html', methods=['GET'])
def index():
    return render_template('./indexGestion.html')

# Ruta para el ícono de favicon-Agregado
#@app.route('/favicon.ico', methods=['GET'])
#def favicon():
#    return send_from_directory('static/img', 'Favicon.ico', mimetype='image/x-icon')



#********** programa principal  LiNEAS PARA CORRER COMO LOCALHOST ****************
#if __name__=='__main__':
#    app.run(host='127.0.0.1', port=5000, debug=True)    # ejecuta el servidor Flask en el puerto 5000.



# por consola correr     python load_data.py para alimentar la base de datos con mi json, genero un script