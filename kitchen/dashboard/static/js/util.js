function drawNodesTable(data){
    var htmlCode = '';
    for(var i=0;i<data.length;i++){
        htmlCode += '<tr><td class="node_name">'+data[i].name+'</td>';
        htmlCode += '<td class="node_ip">'+data[i].ipaddress+'</td>';
        htmlCode += '<td class="node_env">'+data[i].chef_environment+'</td>';
        htmlCode += '<td class="node_role">';
        htmlCode += data[i].roles[0]
        if (data[i].roles.length > 1) {
            for(var j=0;j<data[i].roles.length;j++){
                htmlCode += ", " + data[i].roles[j];
            }
        }
        htmlCode += '</td></tr>';
    }
    $(".table tbody").html(htmlCode);
}