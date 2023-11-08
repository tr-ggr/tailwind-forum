$(document).ready(function () {
  var user = null;
  var pageNo = 1;
  
  function getPosts() {
    $(".posts").html(" ");

    for(let i = 1 ; i <= pageNo ; i++){
      let obj = { page : i };
      $.ajax({
        url: "http://hyeumine.com/forumGetPosts.php",
        method: "Get",
        data: obj,
        success: (data) => {
          let temp = JSON.parse(data);
          console.log(temp);
  
  
          for (let people of temp) {
            console.log(people);
  
            if (people.uid != user.id) {
              $(
                `<div class = "w-[800px] min-h-96 max-h-max bg-[#242526] mt-4 p-5 rounded-2xl flex flex-col gap-4" id = "${people.id}"> <div class = "flex items-center justify-start gap-3"> <i class="fa-solid fa-face-smile text-center text-5xl text-slate-100"></i> <div> <span class = "text-slate-100">${people.user} | uid:${people.uid}</span><br> <span class = "text-slate-100"> ${people.date}</span> </div> </div> <div class = "break-words text-slate-100"> ${people.post} </div> <hr class="border-[#313233]"> <div class = "replies flex flex-col gap-4"> </div> <div class = "flex items-center align-middle justify-center gap-3"> <i class="fa-solid fa-face-smile text-center text-5xl text-slate-100"></i> <input type="text" autocomplete="off" id = "replybox" class="break-words flex-grow border-0 rounded-full h-12 p-6 bg-[#3a3b3c] text-xl text-[#9ea0a5]" placeholder="Write a comment..."> <button class = "reply h-12 w-12 bg-blue-500 rounded-full"> <i class="fa-solid fa-reply text-slate-100"></i> </button> </div> </div>`
              ).appendTo(".posts");
            } else {
              $(
                ` <div class="w-[800px] min-h-96 max-h-max bg-[#242526] border-white border-2 mt-4 p-5 rounded-2xl flex flex-col gap-4" id="${people.id}"> <div class="flex items-center justify-start gap-3"> <button class="h-12 w-12 bg-[#242526] rounded-full user"> <i class="fa-solid fa-face-smile text-center text-5xl text-slate-100 profile"></i> <i class="fa-regular fa-circle-xmark xmark hide text-5xl text-slate-100 bg-red-700 rounded-full"></i> </button> <div> <span class="text-slate-100">${people.user} | uid:${people.uid}</span ><br /> <span class="text-slate-100"> ${people.date}</span> </div> </div> <div class="break-words text-slate-100">${people.post}</div> <hr class="border-[#313233]" /> <div class="replies flex flex-col gap-4"></div> <div class="flex items-center align-middle justify-center gap-3"> <i class="fa-solid fa-face-smile text-center text-5xl text-slate-100"></i> <input type="text" autocomplete="off" id="replybox" class="break-words flex-grow border-0 rounded-full h-12 p-6 bg-[#3a3b3c] text-xl text-[#9ea0a5]" placeholder="Write a comment..." /> <button class="reply h-12 w-12 bg-blue-500 rounded-full group"> <i class="fa-solid fa-reply text-slate-100"></i> </button> </div> </div>`
              ).appendTo(".posts");
            }
  
            if (people.reply != null) {
              // console.log("KANI REPLY NI BUANG: " + people.reply[0])
              people.reply.reverse();
  
              for (let reply of people.reply) {
                if (reply.uid != user.id) {
                  $(
                    ` <div class = "flex items-center justify-start gap-3 w-full h-max" id = "${reply.id}"> <i class="fa-solid fa-face-smile text-center text-4xl text-slate-100"></i> <div class = "flex flex-col"> <div class = "bg-[#3a3b3c] rounded-xl p-2 h-full w-full"> <span class = "text-slate-100 text-[14px] font-bold" >${reply.user} | uid:${reply.uid} | ${reply.date}</span><br> <span class = "text-slate-100 text-[14px]">${reply.reply}</span> <br> </div> </div> </div>`
                  ).appendTo(`#${people.id} > .replies`);
                } else {
                  console.log("ni gana");
                  $(
                    //   ` <div class="flex items-center justify-start gap-3 w-max h-max"> <button class="replying min-w-fit min-h-fit"> <i class="fa-solid fa-face-smile text-center text-4xl text-slate-100 profile1"></i> <i class="fa-regular fa-circle-xmark xmark1 hide text-4xl text-slate-100 bg-red-700 rounded-full"></i> </button> <div class="flex flex-col"> <div class="bg-[#3a3b3c] rounded-xl p-2 h-full w-full border-white border-2"> <span class="text-slate-100 text-[14px] font-bold" >${reply.user} | uid:${reply.uid} | ${reply.date}</span ><br> <span class="text-slate-100 text-[14px]">${reply.reply}</span> <br> </div> </div> </div>`
                    `<div class="flex items-center justify-start gap-3 w-max h-max" id = "${reply.id}"> <button class="replying min-w-fit min-h-fit"> <i class="fa-solid fa-face-smile text-center text-4xl text-slate-100 profile1"></i> <i class="fa-regular fa-circle-xmark xmark1 hide text-4xl text-slate-100 bg-red-700 rounded-full"></i> </button> <div class="flex flex-col"> <div class="bg-[#3a3b3c] rounded-xl p-2 h-full w-full border-white border-2"> <span class="text-slate-100 text-[14px] font-bold" >${reply.user} | uid:${reply.uid} | ${reply.date}</span ><br /> <span class="text-slate-100 text-[14px]">${reply.reply}</span> <br /> </div> </div> </div>`
                  ).appendTo(`#${people.id} > .replies`);
                }
              }
            }
          }
        },
      });
    }

   
  }

  $(".post").click(function () {
    let obj = { id: user.id, post: $("#status").val() };

    $.ajax({
      url: "http://hyeumine.com/forumNewPost.php",
      method: "Post",
      data: obj,
      success: (data) => {
        let temp = JSON.parse(data);
        console.log(temp);
        if (temp.success == false) alert("Failed!");
        else {
          $("#status").val("");
          getPosts();

        }
      },
    })
  });

  $("#load").click(function () {
    pageNo++;
    let obj = { page : pageNo };

    $.ajax({
      url: "http://hyeumine.com/forumGetPosts.php",
      method: "Get",
      data: obj,
      success: (data) => {
        let temp = JSON.parse(data);
        console.log(temp);


        for (let people of temp) {
          console.log(people);

          if (people.uid != user.id) {
            $(
              `<div class = "w-[800px] min-h-96 max-h-max bg-[#242526] mt-4 p-5 rounded-2xl flex flex-col gap-4" id = "${people.id}"> <div class = "flex items-center justify-start gap-3"> <i class="fa-solid fa-face-smile text-center text-5xl text-slate-100"></i> <div> <span class = "text-slate-100">${people.user} | uid:${people.uid}</span><br> <span class = "text-slate-100"> ${people.date}</span> </div> </div> <div class = "break-words text-slate-100"> ${people.post} </div> <hr class="border-[#313233]"> <div class = "replies flex flex-col gap-4"> </div> <div class = "flex items-center align-middle justify-center gap-3"> <i class="fa-solid fa-face-smile text-center text-5xl text-slate-100"></i> <input type="text" autocomplete="off" id = "replybox" class="break-words flex-grow border-0 rounded-full h-12 p-6 bg-[#3a3b3c] text-xl text-[#9ea0a5]" placeholder="Write a comment..."> <button class = "reply h-12 w-12 bg-blue-500 rounded-full"> <i class="fa-solid fa-reply text-slate-100"></i> </button> </div> </div>`
            ).appendTo(".posts");
          } else {
            $(
              ` <div class="w-[800px] min-h-96 max-h-max bg-[#242526] border-white border-2 mt-4 p-5 rounded-2xl flex flex-col gap-4" id="${people.id}"> <div class="flex items-center justify-start gap-3"> <button class="h-12 w-12 bg-[#242526] rounded-full user"> <i class="fa-solid fa-face-smile text-center text-5xl text-slate-100 profile"></i> <i class="fa-regular fa-circle-xmark xmark hide text-5xl text-slate-100 bg-red-700 rounded-full"></i> </button> <div> <span class="text-slate-100">${people.user} | uid:${people.uid}</span ><br /> <span class="text-slate-100"> ${people.date}</span> </div> </div> <div class="break-words text-slate-100">${people.post}</div> <hr class="border-[#313233]" /> <div class="replies flex flex-col gap-4"></div> <div class="flex items-center align-middle justify-center gap-3"> <i class="fa-solid fa-face-smile text-center text-5xl text-slate-100"></i> <input type="text" autocomplete="off" id="replybox" class="break-words flex-grow border-0 rounded-full h-12 p-6 bg-[#3a3b3c] text-xl text-[#9ea0a5]" placeholder="Write a comment..." /> <button class="reply h-12 w-12 bg-blue-500 rounded-full group"> <i class="fa-solid fa-reply text-slate-100"></i> </button> </div> </div>`
            ).appendTo(".posts");
          }

          if (people.reply != null) {
            // console.log("KANI REPLY NI BUANG: " + people.reply[0])
            people.reply.reverse();

            for (let reply of people.reply) {
              if (reply.uid != user.id) {
                $(
                  ` <div class = "flex items-center justify-start gap-3 w-full h-max" id = "${reply.id}"> <i class="fa-solid fa-face-smile text-center text-4xl text-slate-100"></i> <div class = "flex flex-col"> <div class = "bg-[#3a3b3c] rounded-xl p-2 h-full w-full"> <span class = "text-slate-100 text-[14px] font-bold" >${reply.user} | uid:${reply.uid} | ${reply.date}</span><br> <span class = "text-slate-100 text-[14px]">${reply.reply}</span> <br> </div> </div> </div>`
                ).appendTo(`#${people.id} > .replies`);
              } else {
                console.log("ni gana");
                $(
                  //   ` <div class="flex items-center justify-start gap-3 w-max h-max"> <button class="replying min-w-fit min-h-fit"> <i class="fa-solid fa-face-smile text-center text-4xl text-slate-100 profile1"></i> <i class="fa-regular fa-circle-xmark xmark1 hide text-4xl text-slate-100 bg-red-700 rounded-full"></i> </button> <div class="flex flex-col"> <div class="bg-[#3a3b3c] rounded-xl p-2 h-full w-full border-white border-2"> <span class="text-slate-100 text-[14px] font-bold" >${reply.user} | uid:${reply.uid} | ${reply.date}</span ><br> <span class="text-slate-100 text-[14px]">${reply.reply}</span> <br> </div> </div> </div>`
                  `<div class="flex items-center justify-start gap-3 w-max h-max" id = "${reply.id}"> <button class="replying min-w-fit min-h-fit"> <i class="fa-solid fa-face-smile text-center text-4xl text-slate-100 profile1"></i> <i class="fa-regular fa-circle-xmark xmark1 hide text-4xl text-slate-100 bg-red-700 rounded-full"></i> </button> <div class="flex flex-col"> <div class="bg-[#3a3b3c] rounded-xl p-2 h-full w-full border-white border-2"> <span class="text-slate-100 text-[14px] font-bold" >${reply.user} | uid:${reply.uid} | ${reply.date}</span ><br /> <span class="text-slate-100 text-[14px]">${reply.reply}</span> <br /> </div> </div> </div>`
                ).appendTo(`#${people.id} > .replies`);
              }
            }
          }
        }
      },
    });


  });

  $(".create").click(function () {
    if ($(".username").val() == null || $(".lastname").val() == null) {
      alert("Please enter the fields!");
      return;
    }

    let username = $(".username").val() + " " + $(".lastname").val();

    let obj = { username: username };

    $.ajax({
      url: "http://hyeumine.com/forumCreateUser.php",
      method: "Post",
      data: obj,
      success: (data) => {
        let temp = JSON.parse(data);
        console.log(data);
        alert("Success");
      },
    });
  });

  $(".login").click(function () {
    if (
      $(".username").val().trim().length === 0 ||
      $(".lastname").val().trim().length === 0
    ) {
      alert("Please enter the fields!");
      return;
    }

    let username = $(".username").val() + " " + $(".lastname").val();

    let obj = { username: username };

    $.ajax({
      url: "http://hyeumine.com/forumLogin.php",
      method: "Post",
      data: obj,
      success: (data) => {
        let temp = JSON.parse(data);

        console.log(temp);

        if (temp.success == false) alert("Failed!");
        else {
          user = temp.user;
          console.log(user);
          alert("Success!");
          $("div.screen1").toggleClass("hide");
          $("div.container-2").toggleClass("hide");

          $("#status").attr(
            "placeholder",
            `What's on your mind, ${user.username} | ${user.id}?`
          );

          getPosts();
        }
      },
    });
  });

  $(document).on("click", ".reply", function () {
    console.log($(this).parent().parent("div").attr("id"));
    let postID = $(this).parent().parent("div").attr("id");
    console.log($(`#${postID}`).find("input").val());
    console.log("CLICKED!");
    let obj = {
      user_id: user.id,
      post_id: $(this).parent().parent("div").attr("id"),
      reply: $(`#${postID}`).find("input").val(),
    };

    $.ajax({
      url: "http://hyeumine.com/forumReplyPost.php",
      method: "Post",
      data: obj,
      success: (data) => {
        let temp = JSON.parse(data);

        console.log(temp);

        if (temp.success == false) alert("Failed!");
        else {
          getPosts();
          alert("Success!");
        }
      },
    });
  });

  $(document).on("click", ".user", function () {
    console.log("CLICKED!");
    let postID = $(this).parent().parent("div").attr("id");

    let obj = {
      id: $(this).parent().parent("div").attr("id"),
    };

    $.ajax({
      url: `http://hyeumine.com/forumDeletePost.php`,
      method: "Get",
      data: obj,
      success: (data) => {
        let temp = JSON.parse(data);

        console.log(temp);

        if (temp.success == false) alert("Failed!");
        else {
          getPosts();
          alert("Successfully Deleted!");
        }
      },
    });
  });

  $(document).on("click", ".replying", function () {
    let PostID = $(this).parent("div").attr("id");

    console.log(PostID);
    console.log("CLICKED!");

    let obj = {
      id: $(this).parent("div").attr("id"),
    };

    $.ajax({
      url: `http://hyeumine.com/forumDeleteReply.php`,
      method: "Get",
      data: obj,
      success: (data) => {
        let temp = JSON.parse(data);

        console.log(temp);

        if (temp.success == false) alert("Failed!");
        else {
          getPosts();
          alert("Successfully Deleted!");
        }
      },
    });
  });

  $(document).on(
    {
      mouseenter: function () {
        $(this).find(".profile").toggleClass("hide ");
        $(this).find(".xmark").removeClass("hide");
        console.log("LMAOOO");
      },
      mouseleave: function () {
        $(this).find(".profile").removeClass("hide");
        $(this).find(".xmark").addClass("hide");
      },
    },
    ".user"
  );

  $(document).on(
    {
      mouseenter: function () {
        $(this).find(".profile1").addClass("hide ");
        $(this).find(".xmark1").removeClass("hide");
        console.log("LMAOOO");
      },
      mouseleave: function () {
        $(this).find(".profile1").removeClass("hide");
        $(this).find(".xmark1").addClass("hide");
      },
    },
    ".replying"
  );
});
