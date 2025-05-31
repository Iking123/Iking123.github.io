const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");

// 截取摘要
getAbstract();

/**
 * 截取摘要
 */
function getAbstract() {
    let posts = document.getElementById('posts');

    if (document.getElementsByTagName('article').length <= 1) {
        console.log("不在主页！");
        return ;
    }

    let arts = posts.getElementsByClassName("post-body");
    for (let i = 0; i < arts.length; i++) {
        let dom = arts[i];
        let content = dom.innerText
            .substring(0, 250)  + "......";

        let readAll = dom.getElementsByClassName("post-button")[0];
        dom.innerHTML = content;
        dom.appendChild(readAll);
    }
}