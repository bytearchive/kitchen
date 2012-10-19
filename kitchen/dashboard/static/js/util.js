function ajaxLoadNodes(data){
    nodes = data;
    filters = {};
    filters['envs'] = 'all';
    filters['roles'] = [];
    filters['virts'] = 'all';
    setupClickHandlers();
}

function setupClickHandlers() {
    /**
     * Assigns click handlers to all sidebar entries.
     */

    $('li a.sidebar_link#env_link').click(function() {
        var dataName = $(this).parent().attr('data-name');

        if ($(this).parent().hasClass('active')) {
            // Deactivate button
            $(this).parent().removeClass('active');
            filters['env'] = 'all';
            drawTable(applyFilters());
        } else {
            // Activate button and deactivate the rest
            $(this).closest('ul').children('li').children('a.sidebar_link#env_link').parent().removeClass('active');
            $(this).parent().addClass('active');
            filters['env'] = dataName;
            drawTable(applyFilters());
        }
    });

    $('li a.sidebar_link#role_link').click(function() {
        var dataName = $(this).parent().attr('data-name');

        if ($(this).parent().hasClass('active')) {
            // Deactivate button
            $(this).parent().removeClass('active');
            index = filters['roles'].indexOf(dataName);
            filters['roles'].splice(index);
            drawTable(applyFilters());
        } else {
            // Activate button
            $(this).parent().addClass('active');
            filters['roles'].push(dataName);
            drawTable(applyFilters());
        }
    });

    $('li a.sidebar_link#virt_link').click(function() {
        var dataName = $(this).parent().attr('data-name');

        if ($(this).parent().hasClass('active')) {
            // Deactivate button
            $(this).parent().removeClass('active');
            filters['virt'] = 'all';
            drawTable(applyFilters());
        } else {
            // Activate button and deactivate the rest
            $(this).closest('ul').children('li').children('a.sidebar_link#virt_link').parent().removeClass('active');
            $(this).parent().addClass('active');
            filters['virt'] = dataName;
            drawTable(applyFilters());
        }
    });
}

function applyFilters(){
    /**
     * Creates a sublist with the given filters.
     */
    var nodesArray = nodes.filter(function(val){
        // The filter env has to be the same than the node one
        if (filters['env'] != 'all' && val.chef_environment != filters['env']){
            return false;
        }

        // The filter virt has to be the same than the node one
        if (filters['virt'] != 'all' && val.virtualization.role != filters['virt']) {
            return false;
        }

        // Each filter role has to exist in the node
        if (filters['roles'].length > 0) {
            var foundInFilters = false;
            for (var i=0;i<filters['roles'];i++) {
                if (!(val.run_list.indexOf(filters['roles'][i]) > -1)) {
                    return false;
                }
            }
        }

        return true;
    });

    return nodesArray;
}

function drawTable(nodes){
    /**
     * Shows the list of nodes with Datatables.
     */
    $('#node_list').dataTable({
        "aaData": nodes,
        "aoColumns": [
            { "sTitle": "Name",
              "mData": "name" },
            { "sTitle": "IP Address",
              "mData": "ip" },
            { "sTitle": "Environment",
              "mData": "chef_environment" },
            { "sTitle": "Role",
              "mData": "run_list" }
        ]
    });
}
