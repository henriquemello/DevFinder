module.exports = function ParseStringAsArray(string){
    return string.split(',').map(tech => tech.trim());
}