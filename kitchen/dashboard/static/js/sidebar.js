function setupClickHandlers() {
    /**
     * Assigns click handlers to all sidebar entries.
     */

    $('li a.sidebar_link#env_link').click(function() {
        var dataName = $(this).parent().attr('data-name');

        if ($(this).parent().hasClass('active')) {
            // Deactivate button
            $(this).parent().removeClass('active');
        } else {
            // Activate button and deactivate the rest
            $(this).closest('ul').children('li').children('a.sidebar_link#env_link').parent().removeClass('active');
            $(this).parent().addClass('active');
        }
        buildUrl();
    });

    $('li a.sidebar_link#role_link').click(function() {
        var dataName = $(this).parent().attr('data-name');

        if ($(this).parent().hasClass('active')) {
            // Deactivate button
            $(this).parent().removeClass('active');
        } else {
            // Activate button
            $(this).parent().addClass('active');
        }
        buildUrl();
    });

    $('li a.sidebar_link#virt_link').click(function() {
        var dataName = $(this).parent().attr('data-name');

        if ($(this).parent().hasClass('active')) {
            // Deactivate button
            $(this).parent().removeClass('active');
        } else {
            // Activate button and deactivate the rest
            $(this).closest('ul').children('li').children('a.sidebar_link#virt_link').parent().removeClass('active');
            $(this).parent().addClass('active');
        }
        buildUrl();
    });

    $('li a.sidebar_link#options_link').click(function() {
        var dataName = $(this).parent().attr('data-name');

        if ($(this).parent().hasClass('active')) {
            // Deactivate button
            $(this).parent().removeClass('active');
        } else {
            // Activate button and deactivate the rest
            $(this).closest('ul').children('li').children('a.sidebar_link#options_link').parent().removeClass('active');
            $(this).parent().addClass('active');
        }
        buildUrl();
    });
}


function buildUrl(){
    var parameters = {};

    // Collect env parameter
    var env = $('li.active a.sidebar_link#env_link').parent().attr('data-name');
    if (env == undefined) {
        parameters['env'] = '';
    } else {
        parameters['env'] = env;
    }

    // Collect list of role parameters
    $('li.active a.sidebar_link#role_link').each(function(index){
        if (index == 0){
            parameters['roles'] = $('li.active a.sidebar_link#role_link').parent().attr('data-name');
        } else {
            parameters['roles'] += ',' + $(this).parent().attr('data-name');
        }
    });

    // Collect virt parameter
    var virt = $('li.active a.sidebar_link#virt_link').parent().attr('data-name');
    if (virt == undefined) {
        parameters['virt'] = '';
    } else {
        parameters['virt'] = virt;
    }

    // Collect options parameters (graph)
    $('li.active a.sidebar_link#options_link').each(function(index){
        if (index == 0){
            parameters['options'] = $('li.active a.sidebar_link#options_link').parent().attr('data-name');
        } else {
            parameters['options'] += ',' + $(this).parent().attr('data-name');
        }
    });

    // Build url parameters
    var pathName = window.location.pathname;
    if (pathName == '/'){
        var url = 'api/nodes/?extended=true&';
        // Set the url
        for (var param in parameters) {
            url += param + '=' + parameters[param] + '&';
        }
        // Draw new table
        $.getJSON(url.slice(0, -1), function(data){
            drawNodesTable(data);
        });
    } else {
        var url = '?';
        // Remove trailing '&'
        for (var param in parameters) {
            url += param + '=' + parameters[param] + '&';
        }
        // Redirect to new url
        window.location = url.slice(0, -1);
    }
}