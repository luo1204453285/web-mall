let data=[];
let lengthMenu = 5,lengthBusiness= 10;
for (var i = 0; i < lengthMenu; i++) {
  let business = [];
  for (var j = 0; j < lengthBusiness; j++) {
    business[j] = {
      thumbnail:'https://unsplash.it/300/300/?random',
      title:'哈哈哈哈哈哈哈哈'
    }
  }
  data[i] = {
    menuName:`专区${i}`,
    combo:business
  }
}
export default {
  data
}
