let api_url = "";

$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
}
);


async function init() {
    $("#launch_menu").css("display","none");
    $("#content_pane_radio_list").css("display","block");
    api_url = $("#api_url").val();
    // par exemple, chgt fini

    await $.post(api_url, {
        status: "init"
    }
    );

    let ch_list;

    await $.post(api_url, {
        status: "channels"
    },
    function(data, status) {
        if (status != "success") {
            alert("Erreur dl chaines");
            throw new Error();
        }
        ch_list = data;
    }  
    );

    ch_list.forEach(channel => {
        let elt = $("#btn-example-1").clone();
        elt.attr("id","");
        elt.css("display","block");
        elt.attr("name", channel.code);
        elt.attr("title",channel.name);
        elt.click(sel_radio);

        let img = $(document.createElement("img"));
        img.attr("src",channel.pic);
        img.attr("alt",channel.name)
        img.css("width","100%")

        elt.append(img);


        let div = $(document.createElement("div"));
        div.attr("class","col-sm-4");
        div.css("margin-bottom","1%");
        div.append(elt);


        $("#btn-row").append(div);
    });
    $("#info-text").css("display","none");
}

function show_radio_list() {
    $("#content_pane_radio_list").css("display","block");
    $("#content_pane_music_list").css("display","none");
}


async function sel_radio(target) {
    let rid;
    if ($(target.target).attr("name") == undefined) {
        rid = $(target.target.parentElement).attr("name");
    } else {
        rid = $(target.target).attr("name");
    }


    $("#content_pane_radio_list").css("display","none");
    $("#content_pane_music_list").css("display","block");
    
    let music_list;
    $("#info-text-music").css("display","block");
    $("#btn-mus-row").html("");
    //console.log(target);
    //console.log(rid);

    await $.post(api_url, {
        status: "tracks",
        channel: rid
    },
    function(data, status) {
        if (status != "success") {
            alert("Erreur dl chaines");
            throw new Error();
        }
        music_list = data;
    }  
    );
    
    console.log(music_list);
    $("#info-text-music").css("display","none");


    music_list.forEach(music => {
        let div = $(document.createElement("div"));
        div.attr("class","col-sm-4");
        div.css("margin-bottom","1%");

        let btn = $("#btn-example-1-mus").clone();
        btn.css("display","block");
        btn.attr("id","");
        btn.html(music.artist+ " - " +music.title);
        div.append(btn);

        $("#btn-mus-row").append(div);

    });


} 


$("#launch").click(init);
$("#back_music").click(show_radio_list);
