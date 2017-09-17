//Функция подготовки массива для ВК. ВК принимает только строки(
//Берет массив объектов, отрезает последние count штук
//из получившихся объектов дергает только айди, создает новый массив
//делает из массива строку, которую и возрващает. О как) Нужна очень часто))
//
//


export default function arrPrepare(arr, count) {

  var returnstring = [];
  arr = arr.splice(-count, count);

  for (var key of arr) {
    returnstring.push(key.id);
  };

  returnstring = returnstring.join();
  return returnstring;
};
