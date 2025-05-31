mixins.home = {
    mounted() {
        let background = this.$refs.homeBackground;
        let images = background.dataset.images.split(",");
        let id = Math.floor(Math.random() * images.length);
        background.style.backgroundImage = `url('${images[id]}')`;
        this.menuColor = true;

        // 来自Createsequence的自动截取摘要~（被我微调了一下，适应我这个博客的CSS类名）
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
                let button = dom.getElementsByClassName("go-post")[0];
                let body = dom.getElementsByClassName("description")[0];
                body.removeChild(button);

                // resolve abstract content
                let content = body.textContent;
                content = content.substring(0, 250) + "......";
                body.innerHTML = content;

                // append post button
                body.appendChild(button);
            }
        }
    },
    methods: {
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
    },
};
