exports.randomDate = function(n){
	return exports.randomInt(n)+"/"+exports.rangedomInt(1,12)+"/"+exports.rangedomInt(1,28);
};
exports.randomFloat = function(min,max){
	return Math.random()*(b-a)+a;
}
//allMin[n],allMax[n]
exports.randomInt = function(min,max){
	return Math.floor(Math.random()*(b-a)+a);
}
/**
exports.rangedom = function(a,b){
	return Math.random()*(b-a)+a;
}
exports.rangedomInt = function(a,b){
	return Math.floor(exports.rangedom(a,b));
}
/**/