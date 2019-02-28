if(this.myText.includes('youtu')) { 
    var regExp = /^(http\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    result = regExp.exec(this.myText);
    var tempStr = this.myText.replace(regExp, '')
    this.myText = tempStr
    var videourl = result[0]
    console.log(result[0]);
    this.videourl = videourl;  
    
}