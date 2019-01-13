
const tw =  document.getElementById("ts").offsetWidth;
const th = document.getElementById("ts").offsetHeight;

var inc=false;

var user="arasils";
var key="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OmFyYXNpbHMiLCJpc3MiOiJhZ2VudDphcmFzaWxzOjpkNDYzOTBlNC1kNTQzLTRkZWEtYTk3Ny05YTM4ZjgzNmE1NTMiLCJpYXQiOjE1NDQxMzAzODYsInJvbGUiOlsidXNlcl9hcGlfcmVhZCIsInVzZXJfYXBpX3dyaXRlIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZX0.rTnFxgnqChS2xL4BY3SU90P4KFKpe6mOrcGa9FVdxk8gNzwoJNH5wGHfjRoB4tZ_iauhKP11mKiM_iDICW0Bbg"
queryTime("SELECT SUBSTRING(message.date, 1, 10) as daty,COUNT(mid) from message where message.date > '2000-01-01'" +
    "       AND message.date <= '2003-01-01'  group by daty ORDER BY date ASC")

var marginNet = {top: 20, right: 20, bottom: 30, left: 50},
    widthN = document.getElementById("net").offsetWidth - marginNet.left - marginNet.right,
    heightN = document.getElementById("net").offsetHeight - marginNet.top - marginNet.bottom;

var svgNet = d3.select(".network").append("svg")
    .attr("width", widthN + marginNet.left + marginNet.right)
    .attr("height", heightN + marginNet.top + marginNet.bottom)
    .append("g")
    .attr("transform", "translate(" + marginNet.left + "," + marginNet.top + ")");

var g = svgNet.append('g');

var clickCount=0;
var nodes;

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force('charge', d3.forceManyBody()
        .strength(-300)
        // .theta(1)
        .distanceMax(heightN)
    )
    .force("center", d3.forceCenter(widthN / 2, heightN / 2))
    .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius
    })).alphaTarget(0.3);

var colorNodes= d3.scaleOrdinal().range(d3.schemePaired );
var opacityScale= d3.scaleLinear().range([0,0.3]);
var widthScale= d3.scaleLinear().range([1,5]);



var zoom=d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform);});

svgNet.call(zoom);

d3.select('.reset-zoom-button').on('click', () => {
    g.transition().call(zoom.transform, d3.zoomIdentity);
});


svgNet.append('defs').append('marker')
    .attrs({'id':'arrowhead',
        'viewBox':'-0 -5 10 10',
        'refX':13,
        'refY':0,
        'orient':'auto',
        'markerWidth':13,
        'markerHeight':13,
        'xoverflow':'visible'})
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#999')
    .style('stroke','none');



var widthP = document.getElementById("p").offsetWidth - marginNet.right -marginNet.left,
    heightP = th,
    // Think back to 5th grade. Radius is 1/2 of the diameter. What is the limiting factor on the diameter? Width or height, whichever is smaller
    radiusP = Math.min(widthP, heightP) / 2;

var colorP = d3.scaleOrdinal()
    .range(["#2C93E8","#838690","#F56C4E"]);

var arc = d3.arc()
    .outerRadius(radiusP - 10)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radiusP - 40)
    .innerRadius(radiusP - 40);

var svgP = d3.select(".pie")
    .append("svg")
    .attr("width", widthP)
    .attr("height", heightP)
    .append("g")
    .attr("transform", "translate(" + widthP/2 + "," + heightP/2 +")"); // Moving the center point. 1/2 the width and 1/2 the height




queryPos("SELECT nods.`group` FROM nods Group By nods.`group`");




function run(links,nodes) {



    d3.select('.reset-select-button').on('click', () => {
        node.style("stroke-opacity", 1);
        node.style("fill-opacity", 1);
        link.style("stroke-opacity", 1);
        label.style("opacity",1);
        link.attr('marker-end', 'url(#arrowhead)');
    });

    opacityScale.domain(d3.map(links, d => d.value).keys());


    //undirected Graph
    // var link = g.append("g")
    //     .attr("class", "links")
    //     .style("stroke", "#aaa")
    //     .selectAll("line")
    //     .data(links)
    //     .enter().append("line")
    //     .on("mouseover", function (d){
    //         d3.select(this).style("stroke","red" );
    //     })
    //     .on("mouseout", function (d){
    //         d3.select(this).style("stroke","#aaa" );
    //     })


    var link = g.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr('marker-end','url(#arrowhead)')
        .on("mouseover", function (d){
            d3.select(this).style("stroke","red" );
        })
        .on("mouseout", function (d){
            d3.select(this).style("stroke","#aaa" );
        })
        .on("click", function (d){
           console.log("d");
            var heha = [{"name":"Location","count":Math.floor(Math.random() * 100)},{"name":"Finance","count":Math.floor(Math.random() * 100)},{"name":"Health","count":Math.floor(Math.random() * 100)}];
            drawPieChart(heha);

        })


    var linkedByIndex = {};
    links.forEach(function(d) {
        linkedByIndex[d.source + "," + d.target] = 1;
    });

    var node = g.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 2)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

    var label = g.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "label")
        .text(function(d) { return d.id; });

    simulation
        .nodes(nodes)
        .on("tick", ticked);



    simulation.force("link")
        .links(links);

//
// .strength(function (d) {
//         console.log("thid is d"+d)
//         return 0.5;
//     })

    function ticked() {

        //alert();
        opacityScale= d3.scaleLinear()

        var r=10;

        simulation.alphaTarget(0.3).restart()

        node
            .attr("r", r)
            .attr("cx", function (d) {
                d.x = Math.max(r, Math.min(widthN - r, d.x));
                return d.x; })
            .attr("cy", function(d) {
                return d.y = Math.max(r, Math.min(heightN - r, d.y)); })
            .style("fill", d=> colorNodes(d.group))
            .style("stroke", "#424242")
            .style("stroke-width", "1px")
            .on("click", fade(0));

        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; })
            //.on("click", DrawChart());

        // edgepaths.attr('d', function (d) {
        //     return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        // });

        simulation.alphaTarget(0.3).restart()
        // link.attr("d", function(d) {
        //     var dx = d.target.x - d.source.x,
        //         dy = d.target.y - d.source.y,
        //         dr = Math.sqrt(dx * dx + dy * dy);
        //     return "M" +
        //         d.source.x + "," +
        //         d.source.y + "A" +
        //         dr + "," + dr + " 0 0,1 " +
        //         d.target.x + "," +
        //         d.target.y;
        // });

        label
            .attr("x", function(d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .style("font-size", "10px").style("fill", "#333");
    }

    function fade(opacity) {
        return function(d) {
            // check all other nodes to see if they're connected
            // to this one. if so, keep the opacity at 1, otherwise
            // fade
            node.style("stroke-opacity", function(o) {
                //thisOpacity = isConnected(d, o) || node.style("opacity") != 0  ? 1 : opacity;
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                return thisOpacity;
            });
            node.style("fill-opacity", function(o) {
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                return thisOpacity;
            });
            // also style link accordingly
            link.style("stroke-opacity", function(o) {
                return o.source.id == d.id || o.target.id == d.id ? 1 : opacity;
            });

            console
            link.attr('marker-end',function(o) {
                return o.source.id == d.id || o.target.id == d.id  ? 'url(#arrowhead)' : 'null';
            });

            label.style("opacity",function(o) {
                return isConnected(d, o) ? 1 : opacity;
            });
            console.log(opacity);

        };
    }


    function isConnected(a, b) {
        return linkedByIndex[a.id+ "," + b.id] || linkedByIndex[b.id + "," + a.id] || a.id == b.id;
    }
}

function dragstarted(d) {
    if (!d3.event.active) {

        simulation.alphaTarget(0.3).restart()
    }
    d.fx = d.x
    d.fy = d.y
}

function dragged(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
}

function dragended(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
    if (!d3.event.active) simulation.alphaTarget(0);
}


function drawTimeline(data)
{
    var margin = {top: 20, right: 20, bottom: 50, left: 70},
        width = tw - margin.left - margin.right,
        height = th - margin.top - margin.bottom;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.count); });

    var svg = d3.select(".time").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.count; })]);

    svg.selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('cy', d => y(d.count))
        .attr('cx', d => x(d.date))
        .attr('r', 2)
        .attr('fill', "blue");
        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

    // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width/2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Date");

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Number Of the Emails");


    /*
    var brush = d3.svg.brush()
      .x(x)
      .extent([20, 50]);
    */
    var brush = d3.brushX()
        .extent([[0,0], [width,height]])
        .on("start brush", brushed)
        .on("end", brushend);



    var brushg = svg.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, [0, width]);


    brushg.selectAll("rect")
        .attr("height", height);

    //brush.move(brushg, [20, 50].map(x));

    function brushed() {

        var range = d3.brushSelection(this)
            .map(x.invert);

        d3.selectAll("span")
            .text(function(d, i) {
                return Math.round(range[i])
            })
    }

    function brushend() {
        var range = d3.brushSelection(this)
            .map(x.invert);

        var sd = toDateFormat(range[0]) ;
        var ed = toDateFormat(range[1]) ;

        queryGraphInTime(sd,ed);



        function toDateFormat(curDate) {

            var dd = curDate.getDate();

            var mm = curDate.getMonth()+1;
            var yyyy = curDate.getFullYear();
            if(dd<10)
            {
                dd='0'+dd;
            }

            if(mm<10)
            {
                mm='0'+mm;
            }
            return yyyy+'-'+mm+'-'+dd
        }
        svgP.selectAll("*").remove();
    }


}

function drawPieChart(data) {


    var sum=0;
    data.forEach((i) =>{
        sum=sum+i.count;
    });

    svgP.selectAll("*").remove();

    svgP.append("text")
        .attr("transform",
            "translate(" + 0 + " ," +
            (-heightP/2+10) + ")")
        .style("text-anchor", "middle")
        .text("Percentage of disclosure entities in the messages");

    var pie = d3.pie()
        .value(function(d) { return d.count; })(data);

    var g = svgP.selectAll("arc")
        .data(pie)
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return colorP(d.data.name);});

    g.append("text")
        .attr("class","pie-text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d)+ 40 + ")"; })
        .text(function(d) { return d.data.name+"("+((d.data.count/sum)*100).toFixed(2)+"%)";})
        .style("fill", "#000000");

}

function drawLegend(data)
{

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = document.getElementById("lg").offsetWidth - margin.left - margin.right,
        height = th - margin.top - margin.bottom;

    var legend = d3.select(".legend").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    colorNodes.domain(d3.map(data, d => d.group).keys());
    var legendRectSize=20;
    var legendSpacing=5;

    legend.selectAll("g")
        .data(colorNodes.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendRectSize;
            var x = 0;
            var y = i * height-10;
            return 'translate(' + x + ',' + y + ')';
        });

    legend.selectAll("g").append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', colorNodes)
        .style('stroke', colorNodes)
        // .on("click",function () {
        //     d3.select(this).style("opacity",0.3)
        // });

    legend.selectAll("g").append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; });
}

function queryTime(q)
{
    var xhr = new XMLHttpRequest();
    var url = "https://api.data.world/v0/sql/"+user+"/api-sandbox";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", "Bearer "+key);
    xhr.setRequestHeader("content-type", "application/json");
    var data = JSON.stringify({
        "query": q,
        "includeTableSchema": false
    });
    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            json.forEach(d => {
                d.date = new Date(d.daty);
            d.count = +d.count;
        });
            drawTimeline(json);
        }
    };
}


function queryPos(q)
{
    var xhr = new XMLHttpRequest();
    var url = "https://api.data.world/v0/sql/"+user+"/api-sandbox";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", "Bearer "+key);
    xhr.setRequestHeader("content-type", "application/json");
    var data = JSON.stringify({
        "query": q,
        "includeTableSchema": false
    });
    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            drawLegend(json)
        }
    };
}

function queryGraphInTime(sd,ed)
{
    var q="SELECT CONCAT(firstname, \" \", lastname) AS id, `status` AS `group` " +
        "  FROM employeelist " +
        "       JOIN message " +
        "       ON message.sender = employeelist.Email_id " +
        " WHERE message.date > '"+sd+"' " +
        "       AND message.date <= '"+ed+"' " +
        " GROUP BY firstname, lastname, `group` " +
        " UNION " +
        " SELECT CONCAT(firstname, \" \", lastname) AS id, `status` AS `group` " +
        "  FROM recemails " +
        "       JOIN message " +
        "       ON message.mid = recemails.mid " +
        " WHERE message.date > '"+sd+"' " +
        "       AND message.date <= '"+ed+"' " +
        " GROUP BY firstname, lastname, `group`"
    var xhr = new XMLHttpRequest();
    var url = "https://api.data.world/v0/sql/"+user+"/api-sandbox";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", "Bearer "+key);
    xhr.setRequestHeader("content-type", "application/json");
    var data = JSON.stringify({
        "query": q,
        "includeTableSchema": false
    });
    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            nodes=json;
            queryLinksTimed(nodes,sd,ed)
        }
    };
}

function queryLinksTimed(nd,sd,ed)
{
    var q="SELECT CONCAT (employeelist.firstname,\" \",employeelist.lastname) AS source, CONCAT(recemails.firstname,\" \",recemails.lastname) AS target " +
        "FROM message " +
        "JOIN employeelist ON message.sender=employeelist.Email_id " +
        "JOIN recemails ON message.mid=recemails.mid " +
        "where message.date >= '"+sd+"' AND message.date <= '"+ed+"' " +
        "GROUP BY employeelist.firstname,employeelist.lastname,recemails.firstname,recemails.lastname;"
    var xhr = new XMLHttpRequest();
    var url = "https://api.data.world/v0/sql/"+user+"/api-sandbox";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", "Bearer "+key);
    xhr.setRequestHeader("content-type", "application/json");
    var data = JSON.stringify({
        "query": q,
        "includeTableSchema": false
    });
    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            g.selectAll("*").remove();

            //ticked();
            run(json,nd);
        }
    };
}



