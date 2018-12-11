require(['./js/config.js'], function() {
    require(['bscroll', '$'], function(bscroll, $) {
        var scroll = new bscroll('.con', {
            probeType: 2,
            click: true
        });
        var conlist = document.querySelector('.con-list');
        scroll.on('scroll', function() {
            if (this.y < this.maxScrollY - 44) {
                if (page < total) {
                    conlist.setAttribute('up', '释放加载更多');
                } else {
                    conlist.setAttribute('up', '没有更多数据');
                }
            } else if (this.y < this.maxScrollY - 22) {
                if (page < total) {
                    conlist.setAttribute('up', '上拉加载');
                } else {
                    conlist.setAttribute('up', '没有更多数据');
                }
            }
        });
        scroll.on('touchEnd', function() {
            if (conlist.getAttribute('up') === '释放加载更多') {
                if (page < total) {
                    page++;
                    getlist();
                    conlist.setAttribute('up', '上拉加载');
                } else {
                    conlist.setAttribute('up', '没有更多数据');
                }
            }
        })
        var type = 1,
            page = 1,
            page_size = 6;

        getlist();
        //请求数据
        function getlist() {
            $.ajax({
                url: '/api/get/list',
                dataType: 'json',
                data: {
                    type: type,
                    page_size: page_size,
                    page: page
                },
                success: function(res) {
                    if (res.code === 1) {
                        renderlist(res.data);
                        scroll.refresh();
                        total = res.total;
                    }
                }
            });
        }

        //渲染数据
        function renderlist(data) {
            var html = '';
            var baseurl = 'http://localhost:3000/images';
            data.forEach(function(ele) {
                html += `<dl>
							<dt><img src="${baseurl}/${ele.img}" alt=""></dt>
							<dd>
								<p class="title">${ele.title}</p>
								<p class="num"><span class="name">${ele.name}</span><span class="people">${ele.people}w</span></p>
							</dd>
						</dl>`;
            });
            conlist.innerHTML += html;
        }
        var navlist = document.querySelector('.nav-list');
        var lists = document.querySelectorAll('.nav-list li');
        navlist.addEventListener('click', function(e) {
            lists.forEach(function(ele) {
                ele.classList.remove('active');
            })
            e.target.classList.add('active');
            type = e.target.getAttribute('data-id');
            page = 1;
            conlist.innerHTML = '';
            getlist();
        })
    })
})