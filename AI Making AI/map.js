class Map{
    constructor(name, data){
        this.name = name;
        this.data = data;
    }

    randomizeData(lineAmount, winW, winH){

        //Clear it first
        this.data = new Array();

        for(let d = 0; d < lineAmount; ++d){
            
            //Randomize angle. 0 vertical. 1 horizontal
            let angle = Math.floor(Math.random() * 2);

            if(angle === 0){//X will be the same random value
                let x = Math.floor(Math.random() * winW);
                let y1 = Math.floor(Math.random() * winH)
                let y2 = Math.floor(Math.random() * winH)
                
                this.data.push(x, y1, x, y2);
            }else{//Y will be the same random value
                let x1 = Math.floor(Math.random() * winW)
                let x2 = Math.floor(Math.random() * winW)
                let y = Math.floor(Math.random() * winH)

                this.data.push(x1, y, x2, y);
            }
        }
        
    }
    //Loads the map data
    load(){
        for(let d = 0; d < this.data.length; d += 4){
            let t = lineTo2DArray(this.data[d], this.data[d+1], this.data[d+2], this.data[d+3], AIworldWidth, AIworldHeight);
            AIMap = combineArrays(AIMap, t);
            terrainMap = combineArrays(terrainMap, t);
        }
    }

    draw(){
        ctx.lineWidth = 1;

        for(var d = 0; d < this.data.length; d += 4){
            const fx = this.data[d];
            const fy = this.data[d+1];
            const tx = this.data[d+2];
            const ty = this.data[d+3];

            ctx.beginPath();
            ctx.moveTo(fx,fy);
            ctx.lineTo(tx, ty);
            ctx.strokeStyle = "#fff";
            ctx.stroke();
        }
    }
}
