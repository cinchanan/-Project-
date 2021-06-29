import axios from 'axios'
const url ="http://localhost:1337"

export const ContentCreateService =(Author,ContentType,Title,Description,Thumbnail,Status,Link,Category) =>{
    return axios({
        url: url+'/contents',
        method:"POST",
        data:{
            Author,
            ContentType,
            Title,
            Description,
            Thumbnail,
            Status,
           Link,
           Category: Category 
        }
    })
}

export const LinkService =(Sequence,Name,Url) => {
    return axios({
        url: url+'/links',
        method:"POST",
        data:{
            Sequence,
            Name,
            Url

        }
    })
}
export const UpdateLinkService =(Sequence,Name,Url,id) => {
    return axios({
        url:url+'/links/'+id,
        method:"PUT",
        data:{
            Sequence,
            Name,
            Url

        }
     
    })
}
export const GetCategory =() => {
 return axios({
     url: url+'/categories',
     method:"GET",
   
 })
}

export const GetContentID =(id)=> {
    return axios ({
        url: url+'/contents/'+id,
        method:"GET"
    })
}

export const ContentView = (id)=> {
    return axios ({
        url: url+'/contents/'+id+'/view',
        method:"POST"
    })
}
export const GetContent =()=> {
    return axios ({
        url: url+'/contents/',
        method:"GET"
    })
}

export const UpdateContent=(id,Author,ContentType,Title,Description,Thumbnail,Status,Link,Category) => {
    return axios({
        url: url+'/contents/'+id,
        method:'PUT',
        data:{
            Author,
            ContentType,
            Title,
            Description,
            Thumbnail,
            Status,
            Link,
            Category: Category
           
        }
    })
}

export const DeleteContent= (id)=>{
    return axios ({
        url: url+'/contents/'+id,
        method:'DELETE'
    })
}