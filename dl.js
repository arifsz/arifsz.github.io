$(document).ready(function() {
    function q() {
      if (-1 < window.location.href.indexOf("#url=") && !1 === l) {
        var a = window.location.href.match(/#url=(.+)/)[1],
          b = $("#token").val();
        $("#url").val(a);
        "" !== a &&
          ($("#send").html(
            '<i class="fas fa-circle-notch fa-spin"></i> Download'
          ),
          (document.getElementById("send").disabled = !0),
          document.getElementById("links").scrollIntoView(),
          "twitter.com" === m(a).hostname ? n(a, b) : p(a, b));
      }
    }
    function v(a) {
      if ("error" !== a && "" !== a.title) {
        var b = "",
          g = "",
          k = 0,
          h = 0;
        a.links.forEach(function(c) {
          if (null !== c.url) {
            var e = btoa(unescape(encodeURIComponent(a.title)));
            c.url = btoa(unescape(encodeURIComponent(c.url)));
            switch (!0) {
              case "m4a" === c.type || "mp3" === c.type:
                var d = '<a href="{{url}}" class="btn btn-success btn-sq" target="_blank"><span class="align-middle"><i class="fas fa-headphones"></i><br>{{quality}}<br>{{type}}<br>({{size}})</span></a>'.replace(
                  RegExp("{{quality}}", "g"),
                  c.quality
                );
                d = d.replace(RegExp("{{type}}", "g"), c.type);
                d = d.replace(RegExp("{{size}}", "g"), c.size);
                g = d = d.replace(
                  RegExp("{{url}}", "g"),
                  "?source=" +
                    a.source +
                    "&title=" +
                    e +
                    "&type=" +
                    c.type +
                    "&download=" +
                    encodeURIComponent(c.url)
                );
                k++;
                break;
              case "youtube" === a.source && !0 === c.hide && "webm" !== c.type:
                d = '<a href="{{url}}" class="btn btn-warning btn-sq" target="_blank"><span class="align-middle"><span class="fa-stack"><i class="fa fa-volume-up fa-stack-1x"></i><i class="fa fa-ban fa-stack-2x text-danger"></i></span><br>{{quality}}<br>{{type}}<br>({{size}})</span></a>'.replace(
                  RegExp("{{quality}}", "g"),
                  c.quality
                );
                d = d.replace(RegExp("{{type}}", "g"), c.type);
                d = d.replace(RegExp("{{size}}", "g"), c.size);
                d = d.replace(
                  RegExp("{{url}}", "g"),
                  "?source=" +
                    a.source +
                    "&title=" +
                    e +
                    "&type=" +
                    c.type +
                    "&download=" +
                    encodeURIComponent(c.url)
                );
                b = b.concat(d);
                h++;
                break;
              case "jpg" === c.type:
                d = '<a href="{{url}}" class="btn btn-primary btn-sq" target="_blank"><span class="align-middle"><i class="fas fa-image"></i><br>{{quality}}<br>{{type}}<br>({{size}})</span></a>'.replace(
                  RegExp("{{quality}}", "g"),
                  c.quality
                );
                d = d.replace(RegExp("{{type}}", "g"), c.type);
                d = d.replace(RegExp("{{size}}", "g"), c.size);
                d = d.replace(
                  RegExp("{{url}}", "g"),
                  "?source=" +
                    a.source +
                    "&title=" +
                    e +
                    "&type=" +
                    c.type +
                    "&download=" +
                    encodeURIComponent(c.url)
                );
                b = b.concat(d);
                h++;
                break;
              default:
                (d = '<a href="{{url}}" class="btn btn-primary btn-sq" target="_blank"><span class="align-middle"><i class="fas fa-video"></i><br>{{quality}}<br>{{type}}<br>({{size}})</span></a>'.replace(
                  RegExp("{{quality}}", "g"),
                  c.quality
                )),
                  (d = d.replace(RegExp("{{type}}", "g"), c.type)),
                  (d = d.replace(RegExp("{{size}}", "g"), c.size)),
                  (d = d.replace(
                    RegExp("{{url}}", "g"),
                    "?source=" +
                      a.source +
                      "&title=" +
                      e +
                      "&type=" +
                      c.type +
                      "&download=" +
                      encodeURIComponent(c.url)
                  )),
                  (b = b.concat(d)),
                  h++;
            }
          }
        });
        var f = "",
          e = "";
        switch (!0) {
          case 0 < k && 0 === h:
            f = "template/clean/downloads.php?audio=true";
            break;
          case 0 < k && 0 < h:
            f = "template/clean/downloads.php?video=true&audio=true";
            break;
          default:
            f = "template/clean/downloads.php?video=true";
        }
        !1 === jQuery.isEmptyObject(localStorage.getItem(f))
          ? (e = localStorage.getItem(f))
          : $.ajax({
              url: f,
              async: !1,
              dataType: "html",
              success: function(a) {
                localStorage.setItem(f, a);
              }
            });
        e = localStorage.getItem(f);
        e = e.replace(RegExp("{{video_title}}", "g"), a.title);
        e = e.replace(RegExp("{{video_thumbnail}}", "g"), a.thumbnail);
        e = e.replace(RegExp("{{video_duration}}", "g"), a.duration);
        e = e.replace(RegExp("{{page_link}}", "g"), window.location.href);
        0 < h && (e = e.replace(RegExp("{{video_links}}", "g"), b));
        0 < k && (e = e.replace(RegExp("{{audio_links}}", "g"), g));
        $("#links").html(e);
        void 0 === a.duration && $("#video-details").remove();
        $(".fa-spinner").remove();
        document.getElementById("send").disabled = !1;
        e = $("#send");
        e.empty();
        e.html('<i class="fas fa-download"></i>');
        $("#links").addClass("result");
        document.getElementById("download_area").scrollIntoView();
      } else r();
    }
    function p(a, b) {
      "undefined" !== typeof Storage &&
        !1 === jQuery.isEmptyObject(localStorage.getItem(a)) &&
        JSON.parse(localStorage.getItem(a));
      t(a, b);
    }
    function t(a, b) {
      $.post("system/action.php", { url: a, token: b }, function(b) {
        "error" !== b &&
          ((b.timestamp = new Date()),
          localStorage.setItem(a, JSON.stringify(b)));
        v(b);
      });
    }
    function n(a, b) {
      a = a.split("?")[0];
      var g = new Codebird(),
        k = a;
      g.setConsumerKey(
        "K0w8rlDCB6zBB739TGt1BLY2n",
        "3dk9oqc7CQoI90fCyk9JcZEvS88bvkP1YHxI3ylyorl1cNaD5H"
      );
      g.setProxy(w() + "/assets/js/codebird-cors-proxy/");
      var h = k.split("/")[5];
      -1 === k.indexOf("twitter.com") || void 0 === h
        ? r()
        : g.__call("statuses_show_ID", "id=" + h, null, !0).then(function(f) {
            if (
              null != f.reply.extended_entities ||
              null != f.reply.entities.media
            )
              if (
                "video" === f.reply.extended_entities.media[0].type ||
                "animated_gif" === f.reply.extended_entities.media[0].type
              ) {
                var e = 0,
                  c = {};
                f.reply.extended_entities.media[0].video_info.variants.forEach(
                  function(a) {
                    "video/mp4" === a.content_type && ((c[e] = a.url), e++);
                  }
                );
                t(
                  a +
                    "?v144=" +
                    c[1] +
                    "&v480=" +
                    c[2] +
                    "&v720=" +
                    c[3] +
                    "&v360=" +
                    c[0],
                  b
                );
              }
          });
    }
    function w() {
      var a = location.pathname.split("/");
      return "localhost" === location.host
        ? location.origin + "/" + a[1].trim("/") + "/"
        : location.origin;
    }
    function u() {
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
    function r() {
      $(".fa-spinner").remove();
      $.get("template/clean/error.php", function(a) {
        $("#alert").html(a);
        document.getElementById("alert").scrollIntoView();
      });
      $("#alert")
        .fadeTo(4500, 1e3)
        .slideUp(1e3, function() {
          $("#alert").slideUp(3e3);
        });
      document.getElementById("send").disabled = !1;
      var a = $("#send");
      a.empty();
      a.html('<i class="fas fa-download"></i>');
    }
    var l = !1,
      m = function(a) {
        var b = document.createElement("a");
        b.href = a;
        return b;
      };
    $(window).bind("hashchange", function() {
      q();
    });
    (function() {
      var a = 0,
        b = [
          $("#url").attr("placeholder"),
          "Ready to Start",
          "Facebook",
          "Instagram",
          "and more..."
        ];
      setInterval(function() {
        void 0 !== b[a] && (document.getElementById("url").placeholder = b[a]);
        b.length > a ? a++ : (a = 0);
      }, 750);
    })();
    document.getElementById("url").addEventListener("keyup", function(a) {
      a.preventDefault();
      13 === a.keyCode && document.getElementById("send").click();
    });
    q();
    $(document).keypress(function(a) {
      if (13 == a.which) {
        var b = $("#url").val();
        if ("" !== b) {
          l = !0;
          $(this).html('<i class="fas fa-circle-notch fa-spin"></i> Download');
          document.getElementById("send").disabled = !0;
          var g = $("#token").val();
          "twitter.com" === m(b).hostname ? n(b, g) : p(b, g);
          u();
          window.location.replace("#url=" + b);
        }
        a.preventDefault();
      }
    });
    $("#send").click(function(a) {
      var b = $("#url").val();
      if ("" !== b) {
        l = !0;
        $(this).html('<i class="fas fa-circle-notch fa-spin"></i> Download');
        document.getElementById("send").disabled = !0;
        var g = $("#token").val();
        "twitter.com" === m(b).hostname ? n(b, g) : p(b, g);
        u();
        window.location.replace("#url=" + b);
      }
      a.preventDefault();
    });
  });
  