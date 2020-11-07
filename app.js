const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const multer = require("multer");
const path = require("path");
var {PythonShell} = require('python-shell');
// const tf = require('@tensorflow/tfjs-node');
// const upload = multer({dest: __dirname + '/public/uploads'});

const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
// const tf = require('@tensorflow/tfjs');
// require('@tensorflow/tfjs')


// const tf = require("@tensorflow/tfjs");
const { strict } = require("assert");
// const tfn = require("@tensorflow/tfjs-node");

const crop = [];
const output = [ 0,  1,  2,  3,  5,  6,  7,  8,  9, 10,  4];

const carrot = {
    name:'Carrot',
    pic:'gdcarrot.jpeg',
    week1: '0-1 week',
    desc1: 'Do this tilling work three weeks before you put the seeds in the ground. Remove all of the stones and soil clots from the ground,as this is often one of the reasons why carrots don’t grow straight. If the carrot has to deal with a stone in the way, it will grow around the obstruction, resulting in bent carrots. After tilling, we recommend that you fertilize the soil using organic materials like compost and mulch. Work it into the ground in your flowerbed, and then let the soil rest for three weeks before planting your seeds. Plant the seeds about half-inch deep in the soil, and about 1 inch apart. Space your rows at least 15 inches apart.',
    week2 : '1-2 week',
    desc2:'The first few weeks are the most important for growing carrots. During this time, the carrot plant grows its taproot (the largest of all roots, which will later become the carrot).',
    week3: '2-5 week',
    desc3: 'carrots need a minimum of 1 inch of water every week. If they cannot get an adequate supply from rainfall, you will need to water the soil. When you water your carrots, make sure to soak the soil completely.',
    week4:'5-6 week',
    desc4:'upper end of the carrots will push up out of the ground slightly.You must also look for signs of insects and other pests harming your crops. Pests common to carrot plants include carrot root flies, flea beetles, leaf hoppers and rodents.',
    week5: '6-8 week',
    desc5:'upper end of the carrots will push up out of the ground slightly. To dig out your carrots while keeping them intact, use a spade to loosen the soil around them, then push the roots from side to side and, finally, pull them out of the ground by their stocks. They should come up easily.'
};
const tomato = {
    name:'Tomato',
    pic:'gdtomato.jpeg',
    week1: '0-1 week',
    desc1: 'Sow two to three seeds ½ inch deep and 1 inch (2.5 cm) apart in a small pot or flat.Seeds can be started in a bright window or under fluorescent lights set about 2 inches (5 cm) above the plants. Keep seed starting mix just moist until seeds germinate.Germination takes 5 to 7 days at 75°F (24°C) or warmer.',
    week2 : '1-2 week',
    desc2:'Grow tomatoes in full sun, at least 8 hours of sun each day. keep watering the plant properly Tomatoes require regular even watering. Keep the soil moist but not wet',
    week3: '2-5 week',
    desc3: 'A staked tomato requires the least amount of growing space.Stake tomatoes with 6-foot (1.8m) stakes. Set stakes at the time of transplanting.Tie stems to stakes with elastic horticulture tape or garden twine.Staked tomatoes are best pruned so that they grow on a straight stem against the stake Prune staked tomatoes to one or two stems by pinching out the growing tip of each side branch after it has sprouted at least two leaves.To prune to more than one main stem, choose the stems you want to keep and pinch out the rest.Do not pinch back side shoots until two leaf sets develop; this will provide foliage cover from sunburn for fruits and stems later.Note that pruning will reduce the total crop and is likely to increase the incidence of blossom-end rot.',
    week4:'5-6 week',
    desc4:'Mulch around the base of tomatoes with aged compost to slow soil moisture evaporation.For stronger plants and bigger fruit, pinch out all suckers that start to grow in the crotch of the main stem and side branches. Root the suckers in a starting mix to start a second crop for succession planting.As plants grow tall, remove leaves and branches from the bottom 12 inches (30cm) of the plant; this will help prevent the spread of soil-borne diseases.',
    week5: '6-8 week',
    desc5:'Pick your tomatoes when they are red, ripe, and ready to eat. Avoid leaving tomatoes on the window sill to ripen. This strategy may result in the fruit rotting before it turns ripe.If any tomatoes fall off of the plant before they are ripe, put them in a brown paper bag and store them in your root cellar. Avoid irrigating your tomatoes as it removes some of the flavors. The fruits don’t freeze well, and their skins may slip off after defrosting..'
};
const cabbage = {
    name:'Cabbage',
    desc1:'Cabbage requires regular watering. The best option to water your cabbage plants would be to use a watering can or a sprinkler system. Make sure that the soil remains moist, especially when the plants are soaking up sunlight. ',
    desc2:'If pests are a problem in your garden, you can also choose to cover your cabbage plants with a mulching sheet or platen cover. This will help in maintaining the moisture levels of the soil which in turn will lead to faster germination. ',
    desc3:'Keep up the watering schedule and relax. The freshly planted seeds will take 7 to 15 days to germinate. Ensure that the temperature of the soil is maintained at 20°C for optimal germination. '
};


const storage = multer.diskStorage({
    destination :'./public/uploads/',
    filename : function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
});


const upload = multer({
    storage:storage  
});


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/',function(req,res){
    res.render("index");
})



app.get('/prediction',function(req,res){
    res.render("prediction",{crop:crop});
})

app.post('/prediction',function(req,res){
    const state = req.body.state;
    const dist = req.body.dist;

    console.log(state + dist)



    let n1 = 11;
    a1 = Array(n1).fill(0);
    let n2 = 93;
    a2 = Array(n2).fill(0);
    let n3= 12;
    a3 = Array(n3).fill(0);
    let mon =new Date().getMonth()
    a3[mon] = 1;

    if(state==='Uttar Pradesh'){
        a1[n1-1] = 1; 
        if(dist==='AGRA'){
            a2[66] =1;
        }else if(dist==='ALIGARH'){
            a2[67]=1;
        }else if(dist === 'AZAMGARH'){
            a2[71]=1;
        }else if(dist === 'BALLIA'){
            a2[72]=1;
        }else if(dist === 'CHANDAULI'){
            a2[75]=1;
        }else if(dist === 'GHAZIABAD'){
            a2[80]=1;
        }else if(dist === 'GHAZIPUR'){
            a2[81]=1;
        }else if(dist === 'GORAKHPUR'){
            a2[82]=1;
        }else if(dist === 'MEERUT'){
            a2[89]=1;
        }else if(dist === 'RAMPUR'){
            a2[91]=1;
        }else if(dist === 'VARANASI'){
            a2[92]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','chilli.jpeg','okra.jpeg','reddish.jpeg',
                'rice.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('cauliflower.jpeg','carrot.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','potato.jpeg','brinjal.jpeg','onion.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('cabbage.jpeg','capcisum.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','tomato.jpeg','potato.jpeg','brinjal.jpeg','wheat.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('bottelgourd.jpeg','bittergourd.jpeg','cucumber.jpeg','beans.jpeg')
            res.render("prediction",{crop:crop})
        }

       
    }else if(state === 'Andhra Pradesh'){
        a1[0] =1;
        if(dist==='ANANTAPUR'){
            a2[0] =1;
        }else if(dist==='CHITTOOR'){
            a2[1]=1;
        }else if(dist === 'VISAKHAPATANAM'){
            a2[4]=1;
        }else if(dist === 'WEST GODAVARI'){
            a2[6]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','beetroot.jpeg','bottelgourd.jpeg',
            'carrot.jpeg','bittergourd.jpeg','rice.jpeg')
        res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('potato.jpeg','beetroot.jpeg','cabbage.jpeg','brinjal.jpeg','riddish.jpeg')
        res.render("prediction",{crop:crop})
            
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('okra.jpeg','capcisum.jpeg','bottelgourd.jpeg','cucumber.jpeg','bittergourd.jpeg')
        res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('cucumber.jpeg','capcisum.jpeg','bottelgourd.jpeg','bittergourd.jpeg')
        res.render("prediction",{crop:crop})
        }
    }else if(state === 'Arunachal Pradesh'){
        a1[1]=1;
        if(dist==='ANJAW'){
            a2[7] =1;
        }else if(dist==='CHANGLANG'){
            a2[8]=1;
        }else if(dist === 'LOHIT'){
            a2[13]=1;
        }else if(dist === 'TAWANG'){
            a2[15]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','beetroot.jpeg','bottelgourd.jpeg',
            'carrot.jpeg','bittergourd.jpeg','rice.jpeg')
        res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('potato.jpeg','beetroot.jpeg','cabbage.jpeg','brinjal.jpeg','riddish.jpeg')
        res.render("prediction",{crop:crop})
            
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('okra.jpeg','capcisum.jpeg','bottelgourd.jpeg','cucumber.jpeg','bittergourd.jpeg')
        res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('cucumber.jpeg','capcisum.jpeg','bottelgourd.jpeg','bittergourd.jpeg')
        res.render("prediction",{crop:crop})
        }
    }else if(state === 'Assam'){
        a1[2] =1;
        if(dist==='BAKSA'){
            a2[16] =1;
        }else if(dist==='BARPETA'){
            a2[17]=1;
        }else if(dist === 'DARRANG'){
            a2[18]=1;
        }else if(dist === 'NAGAON'){
            a2[20]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','beetroot.jpeg','bottelgourd.jpeg',
            'carrot.jpeg','bittergourd.jpeg','rice.jpeg','tea.jpeg')
        res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('potato.jpeg','beetroot.jpeg','cabbage.jpeg','brinjal.jpeg','riddish.jpeg')
        res.render("prediction",{crop:crop})
            
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('okra.jpeg','capcisum.jpeg','bottelgourd.jpeg','cucumber.jpeg','bittergourd.jpeg')
        res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('cucumber.jpeg','capcisum.jpeg','bottelgourd.jpeg','bittergourd.jpeg')
        res.render("prediction",{crop:crop})
        }
    }else if(state === 'Bihar'){a1[3]=1;
        if(dist==='ARARIA'){
            a2[21] =1;
        }else if(dist==='BUXAR'){
            a2[26]=1;
        }else if(dist === 'GAYA'){
            a2[28]=1;
        }else if(dist === 'ROHTAS'){
            a2[34]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','chilli.jpeg','okra.jpeg','reddish.jpeg',
                'rice.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('cauliflower.jpeg','carrot.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','potato.jpeg','brinjal.jpeg','onion.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('cabbage.jpeg','capcisum.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','tomato.jpeg','potato.jpeg','brinjal.jpeg','wheat.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('bottelgourd.jpeg','bittergourd.jpeg','cucumber.jpeg','beans.jpeg')
            res.render("prediction",{crop:crop})
        }
    }else if(state === 'Haryana'){a1[4]=1;
        if(dist==='AMBALA'){
            a2[36] =1;
        }else if(dist==='JHAJJAR'){
            a2[40]=1;
        }else if(dist === 'MEWAT'){
            a2[43]=1;
        }else if(dist === 'GURGAON'){
            a2[38]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','chilli.jpeg','okra.jpeg','reddish.jpeg',
                'rice.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('cauliflower.jpeg','carrot.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','potato.jpeg','brinjal.jpeg','onion.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('cabbage.jpeg','capcisum.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','tomato.jpeg','potato.jpeg','brinjal.jpeg','wheat.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('bottelgourd.jpeg','bittergourd.jpeg','cucumber.jpeg','beans.jpeg')
            res.render("prediction",{crop:crop})
        }
    }else if(state === 'Jharkhand'){
        a1[5]=1;
        if(dist==='BOKARO'){
            a2[46] =1;
        }else if(dist==='DHANBAD'){
            a2[47]=1;
        }else if(dist === 'RANCHI'){
            a2[48]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','chilli.jpeg','okra.jpeg','reddish.jpeg',
                'rice.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('cauliflower.jpeg','carrot.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','potato.jpeg','brinjal.jpeg','onion.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('cabbage.jpeg','capcisum.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','tomato.jpeg','potato.jpeg','brinjal.jpeg','wheat.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('bottelgourd.jpeg','bittergourd.jpeg','cucumber.jpeg','beans.jpeg')
            res.render("prediction",{crop:crop})
        }
    }else if(state ==='Karnataka'){
        a1[6]=1;
        if(dist==='BAGALKOT'){
            a2[49] =1;
        }else if(dist==='BELGAUM'){
            a2[50]=1;
        }else if(dist === 'DAVANGERE'){
            a2[51]=1;
        }else if(dist === 'MYSORE'){
            a2[52]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','beetroot.jpeg','bottelgourd.jpeg',
            'carrot.jpeg','bittergourd.jpeg','rice.jpeg')
        res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('potato.jpeg','beetroot.jpeg','cabbage.jpeg','brinjal.jpeg','riddish.jpeg')
        res.render("prediction",{crop:crop})
            
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('okra.jpeg','capcisum.jpeg','bottelgourd.jpeg','cucumber.jpeg','bittergourd.jpeg')
        res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('cucumber.jpeg','capcisum.jpeg','bottelgourd.jpeg','bittergourd.jpeg')
        res.render("prediction",{crop:crop})
        }
    }else if(state=== 'Kerala'){
        a1[7]=1;
        if(dist==='ALAPPUZHA'){
            a2[53] =1;
        }else if(dist==='ERNAKULAM'){
            a2[54]=1;
        }else if(dist === 'KOLLAM'){
            a2[56]=1;
        }else if(dist === 'THIRUVANANTHAPURAM   '){
            a2[57]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','beetroot.jpeg','bottelgourd.jpeg',
            'carrot.jpeg','bittergourd.jpeg','rice.jpeg')
        res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('potato.jpeg','beetroot.jpeg','cabbage.jpeg','brinjal.jpeg','riddish.jpeg')
        res.render("prediction",{crop:crop})
            
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('okra.jpeg','capcisum.jpeg','bottelgourd.jpeg','cucumber.jpeg','bittergourd.jpeg')
        res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('cucumber.jpeg','capcisum.jpeg','bottelgourd.jpeg','bittergourd.jpeg')
        res.render("prediction",{crop:crop})
        }
    }else if(state ==='Madhya Pradesh'){
        a1[8]=1;
        if(dist==='AGAR MALWA'){
            a2[58] =1;
        }else if(dist==='ASHOKNAGAR'){
            a2[59]=1;
        }else if(dist === 'INDORE'){
            a2[60]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','chilli.jpeg','okra.jpeg','reddish.jpeg',
                'rice.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('cauliflower.jpeg','carrot.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','potato.jpeg','brinjal.jpeg','onion.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('cabbage.jpeg','capcisum.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','tomato.jpeg','potato.jpeg','brinjal.jpeg','wheat.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('bottelgourd.jpeg','bittergourd.jpeg','cucumber.jpeg','beans.jpeg')
            res.render("prediction",{crop:crop})
        }
    }else if(state === 'Punjab'){
        a1[9]=1;
        if(dist==='AMRITSAR'){
            a2[61] =1;
        }else if(dist==='BATHINDA'){
            a2[62]=1;
        }else if(dist === 'FIROZEPUR'){
            a2[63]=1;
        }else if(dist === 'JALANDHAR'){
            a2[64]=1;
        }else if(dist === 'LUDHIANA'){
            a2[65]=1;
        }
        if(mon === 5 ||mon === 6||mon === 7){
            crop.length = 0;
            crop.push('brocoli.jpeg','capcisum.jpeg','chilli.jpeg','okra.jpeg','reddish.jpeg',
                'rice.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 8||mon === 9){
            crop.length = 0;
            crop.push('cauliflower.jpeg','carrot.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','potato.jpeg','brinjal.jpeg','onion.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon === 10||mon === 11){
            crop.length = 0;
            crop.push('cabbage.jpeg','capcisum.jpeg','peas.jpeg','beetroot.jpeg','reddish.jpeg',
                'spinich.jpeg','tomato.jpeg','potato.jpeg','brinjal.jpeg','wheat.jpeg')
            res.render("prediction",{crop:crop})
        }
        if(mon===1||mon===2){
            crop.length = 0;
            crop.push('bottelgourd.jpeg','bittergourd.jpeg','cucumber.jpeg','beans.jpeg')
            res.render("prediction",{crop:crop})
        }
    }
    

    


    // console.log(a1);
    // console.log(a2);
    // console.log(a3);

    let arr = [];
    
    arr = arr.concat(a1);
    arr = arr.concat(a2);
    arr = arr.concat(a3);
    // console.log(arr);
    // console.log(arr.length);

    let matrix = [];
    for(let i=0; i<1; i++) {
        matrix[i] = [];
        for(let j=0; j<116; j++) {
            matrix[i][j] = arr[j];
        }
    }
    console.log(matrix);




    // let  cropPre = async function(matrix) {
    //     const handler = tfnode.io.fileSystem('cropmodel/model.json');
    //     const model =await tf.loadLayersModel(handler);
    //     // console.log("yes1");
    //     const output = model.predict(matrix);
    //     return output.then(token => { return token } )
    //   }

    //   let cropToken = cropPre(matrix)
    //    console.log(cropToken) 

    //   cropToken.then(function(result) {
    //     console.log(result) 
    //  })
    var options = {
        mode: 'text',
       // pythonPath: 'C:/Python27',
        pythonOptions: ['-u'],
       // scriptPath: 'code',
        args: matrix
      };
    
    // call to python code mlr_algo   
    
     PythonShell.run('ml.py',options, function (err, results) {
       if (err) throw err;
        // results is an array consisting of messages collected during execution
        // console.log('results:',results);
        // res.send( results[0]);  
     });
     console.log("results" ,output);
     console.log("done");

})




app.get("/guidence",function(req,res){
    res.render("guidence",{amount:'',famount:'',crops:''});
});

app.post("/guidence",function(req,res){

    var area = req.body.area
    var crop = req.body.crop
    var onesqftWt = 2.36;

    var onesqftFz =9.072;

    var water = (area * onesqftWt)/ 7;
    var ferti = onesqftFz * area;
    console.log(area +  crop);

    // res.render("guidence");
    if(crop==="carrot"){
        res.render("guidence",{amount:water,famount:ferti,crops:carrot});
    }else if(crop === "cabbage"){
        res.render("guidence",{amount:water,famount:ferti,crops:cabbage});
    }else if(crop === "tomato"){
        res.render("guidence",{amount:water,famount:ferti,crops:tomato})
    }

});

app.get("/dash",function(req,res){
    res.render("dash",{file:'',price:'',crop:'',info:''});
});
app.get("/form",function(req,res){
    res.render("form");
});

app.post("/form",upload.single('photo'),function(req,res){
    let name = req.body.name;
    let mobno = req.body.mobno;
    let state = req.body.state;
    let district = req.body.district;
    let crop = req.body.crop;
    let price = req.body.price;
    let info = req.body.info;
    const file = `uploads/${req.file.filename}`;
    
    
    
    console.log(name + mobno + state + district + crop + price + req.file + info)
    res.render("dash",{file:file,price:price,crop:crop ,info:info});
});


app.listen(3000,function(){
    console.log("server is running at port 3000")
})