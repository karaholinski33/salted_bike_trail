// Script 1

d3.json('2017.json', function(error, data) {
    var stations = {};
    var counts = {}
    for (var i = 0; i < data.length; i++) {
        if (!(data[i]["start station id"] in stations)) {
            stations[data[i]["start station id"]] = {
                name: data[i]["start station id"],
                id: data[i]["start station name"],
                type: 0
            };
        } else if (!(data[i]["end station id"] in stations)) {
            stations[data[i]["end station id"]] = {
                name: data[i]["end station id"],
                id: data[i]["end station name"],
                type: 0
            };
        }
    }
    for (var i = 0; i < data.length; i++){
        var start = data[i]['start station id']
        var end = data[i]['end station id']
        if (start + "***" + end in counts || end + "***" in counts){
            counts[start + "***" + end] += 1
                
            }else{
                counts[start + "***" + end] = 1
            }
        stations[start]['type'] += 1;
        stations[end]['type'] += 1;
    }

    var links = [];
    for (var key in counts){
        var stations_split = key.split("***")
        var start = stations_split[0]
        var end = stations_split[1]
        var type = counts[key]
        var link = {source:start, target:end, type: type}
        links.push(link)
}
    
    
    download(JSON.stringify(Object.values(stations)), 'viz3_stations.json', 'application/json');
    download(JSON.stringify(links), 'viz3_links.json', 'application/json');
    
    console.log('hi')
});

// This routine calculates the distance between two points (given the
// latitude/longitude of those points). It is being used to calculate
// the distance between two locations using GeoDataSource (TM) prodducts
//
// Definitions:
// latitudes are negative, east longitudes are positive
// Passed to function:
//      lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)
//      lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)
//      unit = the unit you desire for results
//              where: 'M' is statute miles (default)
//                     'K' is kilometers
//                     'N' is nautical miles


function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}