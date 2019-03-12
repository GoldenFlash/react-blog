import marked from 'marked'
import hljs from 'highlight.js'
// 将marked转为html
const translateMarkdown = plainText => {
  return marked(plainText, {
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })
}
export{
    translateMarkdown
}
