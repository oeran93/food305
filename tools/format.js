module.exports = {

	/*
	* ellipses a text if it is longer than a specified size
	* @param text {sting}
	* @param size {number} length of text before ellipses
	*/
	dotdotdot: function(text,size){
		if(text.length > size){
			return text.substring(0,size)+"...";
		}return text;
	}

}