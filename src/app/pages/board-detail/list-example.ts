import { List } from 'src/app/models/list.model';

export const listsExample: List[] = [
  new List(
    '1',
    'Por hacer',
    'Lista de tareas por hacer',
    new Date(),
    1,
    [
      { id: 1, title: 'prueba uno' },
      { id: 2, title: 'prueba 2' },
    ],
    'green',
    false
  ),
  new List(
    '2',
    'En curso',
    'Lista de tareas en curso',
    new Date(),
    2,
    [
      { id: 3, title: 'prueba tres' },
      { id: 4, title: 'prueba cuatro' },
    ],
    'red',
    false
  ),
];
