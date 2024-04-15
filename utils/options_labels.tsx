const opcionesVelocidad: Record<string, string[]> = {
    'Despalillado': ['1 hrs', '2 hrs', '3 hrs', '4 hrs', '5 hrs', '6 hrs', '7 hrs', '8 hrs', '9 hrs', '10 hrs', '11 hrs', '12 hrs'],
    'Prensado': ['1 hrs', '2 hrs', '3 hrs', '4 hrs', '5 hrs', '6 hrs', '7 hrs', '8 hrs', '9 hrs', '10 hrs', '11 hrs', '12 hrs'],
    'Pre-flotación': ['1 hrs', '2 hrs', '3 hrs', '4 hrs', '5 hrs', '6 hrs', '7 hrs', '8 hrs', '9 hrs', '10 hrs', '11 hrs', '12 hrs'],
    'Flotación': ['1 hrs', '2 hrs', '3 hrs', '4 hrs', '5 hrs', '6 hrs', '7 hrs', '8 hrs', '9 hrs', '10 hrs', '11 hrs', '12 hrs']
};

const opcionescapacidadMaxima: Record<string, string[]> = {
    'Despalillado': ['10.000 Kilos', '20.000 Kilos', '30.000 Kilos', '40.000 Kilos', '50.000 Kilos', '60.000 Kilos', '70.000 Kilos', '80.000 Kilos', '90.000 Kilos', '100.000 Kilos'],
    'Prensado': ['10.000 Kilos', '20.000 Kilos', '30.000 Kilos', '40.000 Kilos', '50.000 Kilos', '60.000 Kilos', '70.000 Kilos', '80.000 Kilos', '90.000 Kilos', '100.000 Kilos'],
    'Pre-flotación': ['10.000 litros', '20.000 litros', '30.000 litros', '40.000 litros', '50.000 litros', '60.000 litros', '70.000 litros', '80.000 litros', '90.000 litros', '100.000 litros'],
    'Flotación': ['10.000 litros', '20.000 litros', '30.000 litros', '40.000 litros', '50.000 litros', '60.000 litros', '70.000 litros', '80.000 litros', '90.000 litros', '100.000 litros'],
    'Fermentación': ['10.000 litros', '20.000 litros', '30.000 litros', '40.000 litros', '50.000 litros', '60.000 litros', '70.000 litros', '80.000 litros', '90.000 litros', '100.000 litros']

};

export {opcionesVelocidad, opcionescapacidadMaxima}