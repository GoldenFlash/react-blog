// 侧边栏滚动固定
class sidebarFixed{
    constructor(parent,el){
        // this.client =document.documentElement.clientHeight;
		this.parentel = document.getElementsByClassName(parent)[0];
        this.sidebar = document.getElementsByClassName(el)[0];
        this.parentelheight = this.parentel.offsetHeight;
        this.sidebarheight = this.sidebar.offsetHeight;
        this.init()
    }
    init(){
        console.log("init",this)
        // window.onscroll=function(){
        //     console.log(1)
        // }
        this.parentel.addEventListener('scroll',()=>{
            this.Scroll ();
        });
    }
    Scroll(){

        var scolltop = this.parentel.scrollTop;
        var positionTop = this.parentelheight+scolltop-this.sidebarheight
        console.log('positionTop',positionTop)
        console.log('scolltop',scolltop)
        // var height = scolltop+this.client;
        if((this.sidebarheight-this.parentelheight)<=scolltop){
            this.sidebar.style.cssText='position:absolute;right:0;top:'+positionTop+'px';
        }
        // if(height>=this.sidebarheight){
        //     this.sidebar.style.cssText='position:fixed;right:0; top:'+(-(this.sidebarheight-this.client))+'px';
        // }else{
        //     this.sidebar.style.cssText="position:absolute;right:0; top:+'0'+px";
        // }
    }
}
export default{
    sidebarFixed
}