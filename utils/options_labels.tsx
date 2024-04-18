const opcionesVelocidad: Record<string, string[][]> = {
    'Despalillado': [['1', '1 hrs'], ['2', '2 hrs'], ['3', '3 hrs'], ['4', '4 hrs'], ['5', '5 hrs'], ['6', '6 hrs'], ['7', '7 hrs'], ['8', '8 hrs'], ['9', '9 hrs'], ['10', '10 hrs'], ['11', '11 hrs'], ['12', '12 hrs']],
    'Prensado': [['1', '1 hrs'], ['2', '2 hrs'], ['3', '3 hrs'], ['4', '4 hrs'], ['5', '5 hrs'], ['6', '6 hrs'], ['7', '7 hrs'], ['8', '8 hrs'], ['9', '9 hrs'], ['10', '10 hrs'], ['11', '11 hrs'], ['12', '12 hrs']],
    'Pre-flotación': [['1', '1 hrs'], ['2', '2 hrs'], ['3', '3 hrs'], ['4', '4 hrs'], ['5', '5 hrs'], ['6', '6 hrs'], ['7', '7 hrs'], ['8', '8 hrs'], ['9', '9 hrs'], ['10', '10 hrs'], ['11', '11 hrs'], ['12', '12 hrs']],
    'Flotación': [['1', '1 hrs'], ['2', '2 hrs'], ['3', '3 hrs'], ['4', '4 hrs'], ['5', '5 hrs'], ['6', '6 hrs'], ['7', '7 hrs'], ['8', '8 hrs'], ['9', '9 hrs'], ['10', '10 hrs'], ['11', '11 hrs'], ['12', '12 hrs']],
};

const opcionescapacidadMaxima: Record<string, string[][]> = {
    'Despalillado': [['10', '10,000 Kilos'], ['20', '20,000 Kilos'], ['30', '30,000 Kilos'], ['40', '40,000 Kilos'], ['50', '50,000 Kilos'], ['60', '60,000 Kilos'], ['70', '70,000 Kilos'], ['80', '80,000 Kilos'], ['90', '90,000 Kilos'], ['100', '100,000 Kilos']],
    'Prensado': [['10', '10,000 Kilos'], ['20', '20,000 Kilos'], ['30', '30,000 Kilos'], ['40', '40,000 Kilos'], ['50', '50,000 Kilos'], ['60', '60,000 Kilos'], ['70', '70,000 Kilos'], ['80', '80,000 Kilos'], ['90', '90,000 Kilos'], ['100', '100,000 Kilos']],
    'Pre-flotación': [['10000', '10,000 litros'], ['20000', '20,000 litros'], ['30000', '30,000 litros'], ['40000', '40,000 litros'], ['50000', '50,000 litros'], ['60000', '60,000 litros'], ['70000', '70,000 litros'], ['80000', '80,000 litros'], ['90000', '90,000 litros'], ['100000', '100,000 litros']],
    'Flotación': [['10000', '10,000 litros'], ['20000', '20,000 litros'], ['30000', '30,000 litros'], ['40000', '40,000 litros'], ['50000', '50,000 litros'], ['60000', '60,000 litros'], ['70000', '70,000 litros'], ['80000', '80,000 litros'], ['90000', '90,000 litros'], ['100000', '100,000 litros']],
    'Fermentación': [['10000', '10,000 litros'], ['20000', '20,000 litros'], ['30000', '30,000 litros'], ['40000', '40,000 litros'], ['50000', '50,000 litros'], ['60000', '60,000 litros'], ['65000', '65,000 litros'], ['70000', '70,000 litros'], ['80000', '80,000 litros'], ['90000', '90,000 litros'], ['100000', '100,000 litros']],

};

export {opcionesVelocidad, opcionescapacidadMaxima}