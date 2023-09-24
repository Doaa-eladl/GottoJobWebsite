let button = document.querySelector('header>div>button')
let Dailyactiveusers = document.querySelector('.helpsection>div:nth-child(1)>div>div:nth-child(1)>p:nth-child(1)>span')
let Openingjobs = document.querySelector('.helpsection>div:nth-child(1)>div>div:nth-child(2)>p:nth-child(1)>span')

let lowcount = 0;
let highcount = 0;

function onloadcontactpage(){
    document.querySelector('header>div>nav>ul>li:nth-child(4)>a').classList.add('active');
}

function onloadJOBListingpage(){
    document.querySelector('header>div>nav>ul>li:nth-child(3)>ul>li:nth-child(1)>a').classList.add('active');
    document.querySelector('main>section:nth-child(3)>div:nth-child(3)>a:nth-child(2)').classList.add('cardactive')
}

function onloadJOBdetailspage(){
    document.querySelector('header>div>nav>ul>li:nth-child(3)>ul>li:nth-child(2)>a').classList.add('active');
}

function onloadaboutpage(){
    document.querySelector('header>div>nav>ul>li:nth-child(2)>a').classList.add('active');
}

function onloadhomepage(){
    document.querySelector('header>div>nav>ul>li:nth-child(1)>a').classList.add('active');   
}


window.addEventListener('load', ()=>{
    if (window.innerWidth > 992) {
        document.querySelector('header>div>nav>ul>li:nth-child(3)').addEventListener('mouseenter', () => {
            document.querySelector('header>div>nav>ul>li:nth-child(3)>ul').classList.add('opennestedlist');
        });
        /*مضطره اعمل كده عشان متقفلش قبل م اقف عليها*/
        document.querySelector('header>div>nav>ul>li:nth-child(3)>ul').addEventListener('mouseleave', () => {
            document.querySelector('header>div>nav>ul>li:nth-child(3)>ul').classList.remove('opennestedlist');
        });
    }
    //small screen
    else{
        document.querySelector('header>div>nav>ul>li:nth-child(3)').addEventListener('click',()=>{
            document.querySelector('header>div>nav>ul>li:nth-child(3)>ul').classList.toggle('opennestedlist');
            document.querySelector('header>div>nav>ul>li:nth-child(3)').classList.toggle('opennestedlist');
        })
    }
})

function increasecontent(){
    var refreshIntervalId = setInterval(() => {
        if(highcount==450 || lowcount==12){
            clearInterval(refreshIntervalId);
        }
        else{
            lowcount ++
            Dailyactiveusers.textContent = lowcount
    
            highcount += 37.5
            Openingjobs.textContent = highcount
        }
      }, "40");
}

window.addEventListener('scroll',()=>{
    //to run just one time
    if(window.scrollY>2400 && (highcount==0 || lowcount==0)){
        increasecontent()
    }
})


button.addEventListener('click',()=>{
    const currentState = button.getAttribute("aria-expanded");
    if (currentState === "false") {
        button.setAttribute("aria-expanded", "true");
    }
    else {
        button.setAttribute("aria-expanded", "false");
    }    
    /*لازم اتاكد ان المنيو الصغيره اتقفلت*/ 
    document.querySelector('header>div>nav>ul>li:nth-child(3)>ul').classList.remove('opennestedlist');
    document.querySelector('header>div:nth-child(2)').classList.toggle('show')
    document.querySelector('main').classList.toggle('show')
})



function slider(slider){
    if(!slider){
        throw new Error('no slider');
    }

    let current;
    let prev;
    let next;
    let btncount;
    let activebtn;
    let count = -1 ;

    function creatcontrolbtn(){
        if (window.innerWidth > 1200) {
            //large screen
            //btns = cards/2
            btncount = slider.querySelectorAll('.customercard').length%2 !=0 ? (slider.querySelectorAll('.customercard').length+1)/2 : slider.querySelectorAll('.customercard').length/2
            for(var i = 1 ; i <= btncount ; i++){
                let controlbtn = document.createElement('div')
                document.querySelector('.btncontrolcustomercards').appendChild(controlbtn)
            }
        }
        else{
            //small screen
            //btns = cards
            btncount = slider.querySelectorAll('.customercard').length
            for(var i = 1 ; i <= btncount ; i++){
                let controlbtn = document.createElement('div')
                document.querySelector('.btncontrolcustomercards').appendChild(controlbtn)
            }
        }
    }

    function startslider(){
        current = slider.querySelector('.current') || slider.firstElementChild
        prev = current.previousElementSibling || slider.lastElementChild
        next = current.nextElementSibling || slider.firstElementChild
        activebtn = document.querySelectorAll('.btncontrolcustomercards>div')[0]
    }

    function applyclasses(){
        current.classList.add('current')
        prev.classList.add('prev')
        next.classList.add('next')
        activebtn.classList.add('activebtn')
    }

    function removeclasses(){
        //remove all classes
        const classestoberemove = ['prev' , 'current' , 'next']
        //[prev , current , next].forEach(el => el.classList.remove(...classestoberemove))
        prev.classList.remove(...classestoberemove)
        current.classList.remove(...classestoberemove)
        next.classList.remove(...classestoberemove)
        document.querySelectorAll('.btncontrolcustomercards>div').forEach( el => {
            el.classList.remove('activebtn')
        })
    }

    function move(){
        //first remove all classes
        removeclasses()

        //move
        //[prev , current , next] = [current , next , next.nextElementSibling || slider.firstElementChild]
        prev = current
        current = next
        next = next.nextElementSibling || slider.firstElementChild

        
        //move control buttions
        if (window.innerWidth > 1200) {
            //large screen
            //btns = cards/2
            if(count%2==0){
                activebtn = activebtn.nextElementSibling
            }
            else if(current==slider.firstElementChild){
                activebtn = document.querySelector('.btncontrolcustomercards').firstElementChild
                /*سالب 2 عشان هيزيد لما يخرج من ال 
                if */
                count = -2;
            }
            count++;
        }
        else{
            //small screen
            //btns = cards
            activebtn = activebtn.nextElementSibling || document.querySelector('.btncontrolcustomercards').firstElementChild
        }

        //rerun apply classes fun
        applyclasses()
    }


    /*الترتيب مهم لان ف حاجات لسه متكريتيتش */
    creatcontrolbtn()
    startslider()
    applyclasses()


    document.querySelectorAll('.btncontrolcustomercards>div').forEach( (el,index) => {
        if (window.innerWidth < 1200) {
            //small screen each btn = card
            el.addEventListener('click' , ()=> {
                removeclasses()
                //لازم اعيد تعريف الكارنت الاول طالما البريفيوس هتعتمد عليها
                current = slider.querySelectorAll('.customercard')[index];
                prev = current.previousElementSibling || slider.lastElementChild;
                next = current.nextElementSibling || slider.firstElementChild
                activebtn = el
                applyclasses()
            })
        }
        else{
            /*
            //large screen each dot = 2 cards
            /*مفروض يشتغل بس انا مرقعه الترنزشن فالاسكرين الكبيره ف هعملها بطريقه تانيه*/
            
            /*el.addEventListener('click' , ()=> {
                removeclasses()
                //لازم اعيد تعريف الكارنت الاول طالما البريفيوس هتعتمد عليها
                prev = slider.querySelectorAll('.customercard')[index] || slider.lastElementChild;
                current = slider.querySelectorAll('.customercard')[index+1];
                next = slider.querySelectorAll('.customercard')[index+2] || slider.firstElementChild
                activebtn = el
                applyclasses()
            })
            */
            el.addEventListener('click' , ()=> {
                removeclasses()
            /*دي طريقه كستوميز بس عالحته دي نش جينيرال لكن باق الكود صح*/
                if(index==0){
                    next = slider.querySelectorAll('.customercard')[1]
                    current = slider.querySelectorAll('.customercard')[0];
                    prev = slider.lastElementChild;
                    activebtn = el
                }
                if(index==1){
                    next = slider.querySelectorAll('.customercard')[3];
                    current = slider.querySelectorAll('.customercard')[2];
                    prev = slider.querySelectorAll('.customercard')[1];
                    activebtn = el
                }
                if(index==2){
                    next = slider.firstElementChild;
                    current = slider.querySelectorAll('.customercard')[4];
                    prev = slider.querySelectorAll('.customercard')[3];
                    activebtn = el
                }
                applyclasses()
            })
        }
    })

    setInterval( ()=>{move()},4000)
}


slider(document.querySelector('.customercardcontainer'))
/*
document.querySelector('.shownestedjoblist').addEventListener('mouseenter', () => {
    document.querySelector('.nestedjobs').classList.add('shownestedjobs')
});
/*مضطره اعمل كده عشان متقفلش قبل م اقف عليها
document.querySelector('.nestedjobs').addEventListener('mouseleave', () => {
    document.querySelector('.nestedjobs').classList.remove('shownestedjobs')
});
*/


/* just do it by hover css
document.querySelectorAll('main>section:nth-child(3)>div:nth-child(3)>a').forEach( (item) =>{ 
    item.addEventListener('mouseenter', ()=> {
        item.classList.add('cardactive')
    })
    item.addEventListener('mouseleave', ()=> {
        item.classList.remove('cardactive')
    })
})*/

/*ممكن استخدم الطريقه دي فالسليدر بس مش هتظبط لو عوزاه يرجع يلف م الاول زي الدايره انه يشفت بمقدار الصوره زائد المرجن وحلو انه مقدار الصوره عشان لو بتتغير من اسكرين للتانيه
    عشان تشتغل لازم اعملها +=
    document.querySelector('.customercardcontainer').scrollLeft += document.querySelector(".customercard").clientWidth + 50
*/
