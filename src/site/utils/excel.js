
export const downloadExcel = (name, rawData, type, link) => {
  let data = new Map();
  data.set(name, rawData);
  let keyMap, tmpdata;
  let sheetTmpData = new Map();
  let outputPos = new Map();
  for(let [key, value] of data.entries()) {
    if(value.length) {
      keyMap = Object.keys(value[0]);
      value.unshift({});
      for (let k in value[1]) {
        value[0][k] = k;
      }
      tmpdata = [];
      value.map((v, i) => keyMap.map((k, j) => Object.assign({}, {v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      })))
        .reduce((prev, next) => prev.concat(next))
        .forEach((v, i) => tmpdata[v.position] = {v: v.v});
      sheetTmpData.set(key, tmpdata);
      outputPos.set(key, Object.keys(tmpdata));
    }
    else {
      sheetTmpData.set(key, []);
      outputPos.set(key, []);
    }
  }
  let sheetData = {};
  for(let [key, value] of sheetTmpData.entries()) {
    sheetData[key] = Object.assign({}, value, {
      '!ref': outputPos.get(key)[0] + ':' + outputPos.get(key)[outputPos.get(key).length - 1] //设置填充区域
    });
  }
  let tmpWB = {
    SheetNames: Object.keys(sheetData),
    Sheets: sheetData
  };
  let tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
    {bookType: (type == undefined ? 'xlsx' : type),
      bookSST: false, type: 'binary'}
  ))], {type: ""});
  let href = URL.createObjectURL(tmpDown);
  document.getElementById(link).href = href;
  document.getElementById(link).click();
  setTimeout(function() {
    URL.revokeObjectURL(tmpDown);
  }, 100);
};

export const uploadExcel = uploadInput => {
  return new Promise(resolve => {
    if(!uploadInput.files.length) {
      this.$message({message: '请选择要导入的文件！', type: 'warning'});
      return;
    }
    let file = uploadInput.files[0];
    let lines = [];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = function(ev) {
      try {
        let data = ev.target.result;
        let workbook = XLSX.read(data, {type: 'binary'});
        for (let sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            lines = lines.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            break;
          }
        }
        resolve(lines);
      }
      catch (error) {
        console.log(error);
      }
    };
  })
};

const s2ab = (s) => {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
};

const getCharCol = (n) => {
  let temCol = '';
  let s = '';
  let m = 0;
  while (n > 0) {
    m = n % 26 + 1;
    s = String.fromCharCode(m + 64) + s;
    n = (n - m) / 26;
  }
  return s;
};

export const loadTemplateString = (text) => {
  let result = {};
  if(!text) return result;
  if(text.indexOf(':') > 0){
    text.split(',').map(item =>{
      if(item.indexOf(':') > 0){
        let pair = item.split(':');
        result[pair[0]] = pair[1];
      }
    })
  }
  return result;
};


export const loadFormatString = (text) => {
  let result = [];
  if(!text) return result;
  if(text.indexOf('|') > 0){
    text.split(',').map(item =>{
      if(item.indexOf('|') > 0){
        let pair = item.split('|');
        result.push({attrName: pair[0], prop: pair[0]});
      }else{
        result.push({attrName: item, prop: item});
      }
    })
  }
  return result;
};
