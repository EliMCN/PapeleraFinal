import json

# Cargar el archivo JSON
try:
    with open('primera_carga.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("Error: El archivo JSON no se encontró.")
    exit()

# Crear un script SQL con las instrucciones INSERT dentro de la tabla producto
sql_script = "INSERT INTO producto (nombre, precio, fecha, barra, unidadpaquete, unidadcaja, preciounitario, conutilidad, categoria, stock, imagen) VALUES\n"

for producto in data.get('productos', []):
    values = f"('{producto.get('nombre', '')}', {producto.get('precio', 0)}, '{producto.get('fecha', '')}', " \
             f"'{producto.get('barra', '')}', '{producto.get('unidadpaquete', '')}', '{producto.get('unidadcaja', '')}', " \
             f"'{producto.get('preciounitario', '')}', '{producto.get('conutilidad', '')}', '{producto.get('categoria', '')}', " \
             f"{producto.get('stock', 0)}, '{producto.get('imagen', '')}')"
    sql_script += values + ",\n"

# Elimina la coma extra al final y agrega punto y coma
sql_script = sql_script.rstrip(",") + ";"

# Guarda el script SQL en un archivo
try:
    with open('script.sql', 'w') as sql_file:
        sql_file.write(sql_script)
    print("Script SQL generado con éxito.")
except IOError:
    print("Error: No se pudo escribir el archivo SQL.")



# en mi consola cmd:
# (proyecto) Z:\CODO FULL STACK\proyectoCRUD\proyecto>python load_data.py
# Script SQL generado con éxito. Entonces en workbench, File y run SQL script
