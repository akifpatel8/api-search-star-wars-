
let movies_div=document.getElementById("movies")
let timerId;

async function searchMovies(){
    let query=document.getElementById("query").value
    if(query.length<=0){
        return false
    }
    let res=await fetch(`https://swapi.dev/api/people/?search=${query}`)
    let data=await res.json();
    return data.results;
    
}

async function throttleFunction(){
    if(timerId){
        return false
    }

    timerId=setTimeout(()=>{
        main();
        timerId=undefined;
    },500);

}




function appendMovies(x){
    movies_div.innerHTML=null
    
   
    x.forEach(({name,birth_year,gender})=>{
        let minidiv=document.createElement("div")
        let div1=document.createElement('div')
        let div2=document.createElement('div')
        let m_name=document.createElement("h4")
        let m_birth=document.createElement("p")
        let m_gender=document.createElement("p")
        m_name.innerHTML=name;
        m_birth.innerHTML=birth_year;
        m_gender.innerHTML=gender;
        div1.append(m_name,m_birth)
        div2.append(m_gender)
        // div2.setAttribute("class","div2")
        minidiv.setAttribute("class","minidiv")
        minidiv.append(div1,div2)
        // minidiv.append(div3)
        movies_div.append(minidiv)
    });
}

async function main(){
    let movies=await searchMovies()
    appendMovies(movies)

}

function close(){
    movies_div.remove()
}