
function map(f) {
  var mapped = new Array(this.length);

  for(var i = 0; i < this.length; i++) {
    mapped[i] = f(this[i], i);  
  }

  return mapped;
}
es7
[1, 2, 3]::map(x => x * 2)

es6
[1, 2, 3]＝>map(x * 2)