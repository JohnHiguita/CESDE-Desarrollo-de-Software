import datetime

# Esta es la lista principal que almacena los vehículos parqueados
parqueadero = []

"""Esta función registra el ingreso de un nuevo vehículo al parqueadero"""

def registrar_ingreso():
    placa = input ("Ingresa la placa del vehículo: ").upper()
    tipo = input("Ingresa el tipo de vehículo (Carro/Moto): ").capitalize()

    # Con esto validamos el tipo de vehículo
    if tipo not in ["Carro" , "Moto"]:
        print("Tipo de vehículo no válido. Por favor, ingresa 'Carro' o 'Moto'.")
        return

    # Usamos una tupla para los datos inmutables
    datos_inmutables = (placa, tipo)

    #Creamos el diccionario del vehículo
    vehiculo = {
        "datos": datos_inmutables,
        "hora_entrada": datetime.datetime.now().strftime("%H:%M"),
        "hora_salida": None
    }

    parqueadero.append(vehiculo)
    print(f"Vehículo con placa {placa} ingresado a las {vehiculo['hora_entrada']}.")

""" Esta función registra la salida de un vehículo del parqueadero """

def registrar_salida():
    placa = input("Ingresa la placa del vehículo que deseas retirar: ").upper()

    encontrado = False
    for vehiculo in parqueadero:

        # Accedemos a la tupla de datos inmutables
        if vehiculo["datos"][0] == placa:
            if vehiculo["hora_salida"] is None:
                vehiculo["hora_salida"] = datetime.datetime.now().strftime("%H:%M")
                print(f"Vehículo con placa {placa} retirado a las {vehiculo['hora_salida']}.")
            else:
                print(f"El vehículo con placa {placa} ya había sido retirado.")
            encontrado = True
            break


    if not encontrado:
        print(f"Vehículo con placa {placa} no encontrado en el parqueadero.")

""" Muestra la lista de todos los vehículos actualmente parqueados."""

def mostrar_parqueados():

    if not parqueadero:
        print("El parqueadero está vacío.")
        return

    print("\n--- Vehículos parqueados ---")
    for vehiculo in parqueadero:
        placa, tipo = vehiculo["datos"]
        hora_entrada = vehiculo["hora_entrada"]
        hora_salida = vehiculo["hora_salida"]

        estado = "Parqueado" if hora_salida is None else f"Retirado a las {hora_salida}"
        print(f"Placa: {placa} | Tipo: {tipo} | Entrada: {hora_entrada} | Estado: {estado}")
    print("-------------------------\n")

    """ Función principal que muestra el menú y maneja la interacción del usuario."""

def menu_principal():

    while True:
        print("\n--- Sistema de Parqueo ---")
        print("1. Registrar ingreso de vehículo")
        print("2. Registrar salida de vehículo")
        print("3. Ver vehículos estacionados")
        print("4. Salir")

        opcion = input("Selecciona una opción: ")

        if opcion == "1":
            registrar_ingreso()
        elif opcion == "2":
            registrar_salida()
        elif opcion == "3":
            mostrar_parqueados()
        elif opcion == "4":
            print("Saliendo del programa: ¡Hasta luego!")
            break
        else:
            print("Opción no válida. Por favor, intenta de nuevo.")

        #Ejecutamos el menú principal

        if __name__ == "__main__":
            menu_principal()










