import marked from 'marked'
import hljs from 'highlight.js'
var render = new marked.Renderer()
// 将marked转为html
render.code=function(code, infostring, escaped) {
  // console.log("code1",code)
  var lang = (infostring || '').match(/\S*/)[0];

  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }
  var codelist = code.split(/\n/g)
  // console.log("codelist",codelist)
  var htmlStr = ""
  codelist.forEach((item)=>{
    if(item){
      htmlStr+='<li><code>'
    + (escaped ? item : escape(item, true))
    + '</code></li>'
    }
  })
  if (!lang) {
    return '<pre><ol>' +htmlStr + '</ol></pre>';
  }

  return '<pre><0l> class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'  + htmlStr + '</ol></pre>\n';
};

const translateMarkdown = plainText => {
  return marked(plainText, {
    renderer: render,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    langPrefix:true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })
}
export{
    translateMarkdown
}
