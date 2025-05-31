mixins.home = {
    mounted() {
        let background = this.$refs.homeBackground;
        let images = background.dataset.images.split(",");
        let id = Math.floor(Math.random() * images.length);
        background.style.backgroundImage = `url('${images[id]}')`;
        this.menuColor = true;

        // 魔改自Createsequence的自动截取摘要~（我改了改他的getAbstract具体操作，以适应我这个博客的HTML和CSS）
        window.onload = function() {
            return getAbstract();
        }

        /**
         * 截取摘要
         */
        function getAbstract() {
            let arts = document.getElementsByClassName('post');
            if (arts.length <= 1) {
                console.log("不在主页！");
                return ;
            }
            for (let i = 0; i < arts.length; i++) {
                let dom = arts[i];
                // process post body
                let body = dom.getElementsByClassName("description")[0];

                // resolve abstract content
                let content = body.textContent.slice(0);
                if(content.length>150) content = content.substring(0, 150) + "......";
                body.innerHTML = content;
            }
        }
    },
    methods: {
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
    },
};
