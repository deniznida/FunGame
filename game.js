$(document).ready(function(){
    console.log('ready');

    // a cross reference of area names to text to be shown for each area
    var xref = {
        Hopper: "You are in Hopper.",
        Faraday: "You are in Faraday.",
        Borg: "You are in Borg.",
        Kay: "You are in Kay.",
        Lovelace: "You are in Lovelace.",
        HallwayInside: "You are in the inside Hallway.",
        Swartz: "You are in Swartz.",
        Turing: "You are in Turing.",
        Babbage: "You are in Babbage.",
        HallwayOutside: "You are in the outside Hallway.",
        Restroom: ""
    };
    
    var defaultDipTooltip = 'Are you looking for someone?';
    
    var image = $('#mapimage');

    image.mapster(
    {
        fillOpacity: 0.4,
        fillColor: "d42e16",
        stroke: true,
        strokeColor: "3320FF",
        strokeOpacity: 0.8,
        strokeWidth: 4,
        singleSelect: true,
        mapKey: 'name',
        listKey: 'name',
        onClick: function (e) {
            var newToolTip = defaultDipTooltip;
            
            // update text depending on area selected
            $('#selections').html(xref[e.key]);
            
            // if Asparagus selected, change the tooltip
            if (e.key === 'asparagus') {
                newToolTip = "OK. I know I have come down on the dip before, but let's be real. "
                    +"Raw asparagus without any of that delicious ranch and onion dressing "
                    +"slathered all over it is not so good.";
            }
            image.mapster('set_options', { 
                areas: [{
                    key: "dip",
                    toolTip: newToolTip
                    }]
                });
        },
        showToolTip: true,
        toolTipClose: ["tooltip-click", "area-click"],
    });
});