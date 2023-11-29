 const eventData=require('../models/event');
const trendData=require('../models/hashtag');


const getTrendFile=async(req,res)=>{
    let events=await eventData.find();

    req.flash("sucess","events fetched") 
    res.render("Trending",{msg:req.flash(),events:events});
   
}

const showTrendingHashtag=async(req,res,next)=>{
    let events=await eventData.find();
    let result=await trendData.find();
    var hashtag=result
    
    console.log("___________")
    events.forEach(async (element) => {
    console.log(hashtag)
        let a =element.e_hashtags
        for(let j=0;j<a.length;j++){
            for(let i=0;i<hashtag.length;i++){
   
                if(hashtag[i].tag == a[j]){
                    hashtag[i].count+=1;
                }
               
            }
        }
        var b=[]
a.forEach(element => {
    b[element]=false
});

for(let j=0;j<a.length;j++){

    for(let i=0;i<hashtag.length;i++){
        
        if(hashtag[i].tag == a[j]){
           b[a[j]]=true; 
        }       
    }
}

Object.keys(b).forEach(async(element) => {
if(b[element] == false){
     hashtag.push({
        tag:element,
        count:0
     })
    
}

});

let data=await trendData.find();
console.log("-------------------------------------------------")
console.log(data)
await trendData.replaceOne({_id:data[0]._id},{hashtags:hashtag}).then((result) =>{
  console.log("data updated")

}).catch(function (err) {
console.log(err)
req.flash("error",err);
// res.send(err);


})

        
});

next();
   
    }
    const testadd=async(req,res)=>{
        let tag=new trendData(
            {

                hashtags:[{tag:"ind",count:0}]
            }
        )
    tag.save().then((result)=>{
            
       console.log("trends calculated successfully")
        
    }).catch((err)=>{
        console.log(err);
        req.flash("error","Can Not Get Trending Events")
        res.render("event",{msg:req.flash(),events:null})    
    })   
}
const test1=(req,res)=>{
res.send("okay ")
}
const mid=(req,res,next)=>{
    console.log(("middleware on duty"))
    next()    
}
module.exports = {
    getTrendFile,
    showTrendingHashtag,
    testadd,
    test1,
    mid
};
