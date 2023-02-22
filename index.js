const Discord = require ('discord.js');

var client = new Discord.Client();

const token = "Njg4ODM3OTk0ODk5MDQ2NTgw.XnEQ-w.YYRigf8G58Wnu0GO5ZfKYTwaHvA";

function catchErr (err, message) {
    client.users.get("673485740679757835").send ("There was an error at channel " + message.channel + " in Guild " + message.guild );
    client.users.get("673485740679757835").send ("ERROR ```" + err + "```" )
}




client.on ("ready", () => {
    console.log("Ready!");

    client.user.setActivity("Testing bot");
});

const fs = require("fs");
client.msgs = require ("./msgs.json");

/*
client.on ("guildMemberAdd", member => {

    var role = member.guild.roles.find ("name", "Member")
    member.addRole (role);

})

client.on ("guildMemberRemove", member => {

})

/*
client.on(`message`, async message => {
    if(message.content.startsWith(`${prefix}` + `createchannel`)) {
        const args = message.content.slice(15);
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic(`I really hope this works!`)
        })
    }
})
*/




const prefix = "m!";
client.on ("message", (message) => {

    msg = message.content.toLowerCase();

    if (message.author.bot) return;

    mention = message.mentions.users.first();

    if (msg.startsWith (prefix + "send")) {
        if (mention == null) { return; }
        message.delete(3000);
        mentionMessage = message.content.slice (8);
        mention.sendMessage (mentionMessage);
        message.channel.send ("Done!");
    }

    /*
    if(msg.startsWith (prefix + "help")) {
        async run(message); {
              let client = message.channel.client;
              let user = client.fetchUser('<id number>')
              .then(user => {
                    user.send("**Here is a list of all current commands and features:** \n\n__m!crole (creates a role)__ \n\n__m!send (DMs a person)__ \n\n__Hey! (The bot will reply)__ \n\n__m!8ball (will 8ball a statement)__ \n\n:eyes: __(The bot will respond)__ \n\n__pan (The bot will respond)__ \n\n__Auto role (Bot will assign role)__ \n\n__m!embed (Will make an embed)__ \n\n**More coming soon...**");
              });
        }
    }

    
    function emoji (id) {

        return client.emojis.get(id).toString();
    
    };
    
    if (message.content.includes("I love you")) {
        message.react("heart emoji ID");
    } else
    
    */


    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0]){

    case 'clear':
            if(!args[1]) return message.reply('Error, specify how many messages to clear')
            message.channel.bulkDelete(args[1]);
        break;
    }


    
    if (msg.startsWith (prefix + "help")) {
        if (mention == null) { return; }
        message.delete(3000);
        mentionMessage = message.content.slice (8);
        mention.sendMessage ("**Here is a list of all current commands and features:** \n\n__m!crole (creates a role)__ \n\n__m!send (DMs a person)__ \n\n__Hey! (The bot will reply)__ \n\n__m!8ball (will 8ball a statement)__ \n\n:eyes: __(The bot will respond)__ \n\n__pan (The bot will respond)__ \n\n__Auto role (Bot will assign role)__ \n\n__m!embed (Will make an embed)__ \n\n**More coming soon...**");
        message.channel.send ("Check your DMs");
    }


    if (msg.startsWith ("hey")) {
        //1000 = 1 sec
        message.delete (3000);
        message.reply ("Hey!").then(d_msg => { d_msg.delete(50000) });
    }


    msg = message.content.toLowerCase();

    if (msg.startsWith (prefix + "hello")) {
        message.reply ('Hi!');
        
        message.channel.send ("message: " + message);
        message.channel.send ("message sender: " + message.author.username);
        message.channel.send ("message sender ID: " + message.author.id);
    }

    if (message.content.startsWith ("👀")) {
        message.channel.send (":eyes:");
        let emojicounter = client.msgs["counter"].eyesEmoji;
        client.msgs ["counter"] = {
            eyesEmoji: emojicounter + 1
        }
        fs.writeFile ("./msgs.json", JSON.stringify (client.msgs, null, 6), err => {
            if (err) throw err;
            message.channel.send ("emoji counted");
        });

    }


    if (msg.startsWith ("pan")) {
        message.channel.send ("Who doesn't like scrambled eggs?", {files: ["./pans/pan.png"]});
    }

    if (msg.startsWith ("write")) {
        editmessage = message.content.slice (5)

        client.msgs [message.author.username] = {
            message: editmessage
        }
        fs.writeFile ("./msgs.json", JSON.stringify (client.msgs, null, 8), err => {
            if (err) throw err;
            message.channel.send ("message written");
        });
    }

    if (msg.startsWith ("get")) {
        let _message = client.msgs[message.author.username].message;
        message.channel.send ("message is : " + _message)
    }
    
    if (msg.startsWith (prefix + "8ball")) {
        ballMessage = message.content.slice (8);
        number = 2;
        var random = Math.floor (Math.random() * (number - 1 + 1)) + 1;
        switch (random) {
            case 1: message.channel.send ('The 8ball says that "' + ballMessage + '"will come to pass'); break;
            case 2: message.channel.send ('The 8ball says that "' + ballMessage + '"will **not** come to pass'); break;
        }
    }
    

    if (msg.includes (prefix + "embed")) {
        embed = new Discord.RichEmbed ()
            .setAuthor("Fred")
            .setDescription("This is an embed")
            .setFooter("This embed was created by FredTheBread")
            .addField("Hello", "😄😄😄")
            .setThumbnail("https://cdn.discordapp.com/attachments/689568955345797207/690303088317431978/shreg.jpg")
            .setColor("00f00");

        message.channel.send (embed);

    }

    if (msg.includes (prefix + "dm")) {
        embed = new Discord.RichEmbed ()
            .setAuthor("FredTheBread")
            .setDescription("Dm FredTheNiggaBread#1731 for help")
            .setFooter("Don't spam my dms please :)")
            .addField("If you need help please dm me", "for help")
            .setThumbnail("https://cdn.discordapp.com/attachments/689568955345797207/691335149194969219/unknown.png")
            .setColor("00f00")
        
        message.channel.send (embed);
    }

    if (msg.includes (prefix + "prefix")) {
        embed = new Discord.RichEmbed ()
            .setAuthor("Bread Bot")
            .setDescription("Prefix")
            .setFooter("If you need help dm me")
            .addField("FredTheNiggaBread#1731", "Prefix is m!")
            .setThumbnail("https://cdn.discordapp.com/attachments/689568955345797207/691335149194969219/unknown.png")
            .setColor("00f00")

        message.channel.send (embed);
    }
    /*
    if (msg.includes (prefix + "help")) {
        embed = new Discord.RichEmbed ()
            .setAuthor("Bread Bot")
            .setDescription("Here is a list of all current commands: m!crole (creates a role) | m!send (DMs a person) | Hey! (The bot will reply) | m!8ball (will 8ball a statement) | :eyes: (The bot will respond) | pan (The bot will respond) | Auto role (Bot will assign role) | m!embed (Will make an embed) | More coming soon... ")
            .setFooter("I will add more soon...")
            .addField("If you have questions or suggestions feel free to dm me by doing m!dm")
            .setThumbnail("https://cdn.discordapp.com/attachments/689568955345797207/691335149194969219/unknown.png")
            .setColor("00f00")
        
        message.channel.send (embed);
    }
    */

    if (msg.includes (prefix + "crole") && message.member.hasPermission ("MANAGE_ROLES")) {
        messageSplit = message.content.split (" ", 3);
        roleName = messageSplit[1];
        roleColor = messageSplit[2].toUpperCase();
        addRolePerson = message.member;
        if (mention != null) { addRolePerson = message.guild.member(mention); }
        message.guild.createRole ( {
            name: roleName,
            color: roleColor,
            mentionable: true,
        }).then (role  => addRolePerson.addRole(role));
        message.channel.send ("The Role " + roleName + " has been added").then(d_msg => { d_msg.delete(3000); });
        message.delete(3000);
    }
    /*
    if (msg.startsWith (prefix + "randomimage")) {
        number = 15;
        imageNumber = Math.floor (Math.random() * (number - 1 + 1)) + 1;
        message.channel.send ( {files: ["./images/" + imageNumber + ".jpg"]} )
    }
    */



    try {
    
    if (msg.startsWith ("hewwo")) {
        thisIsNotDefinedXD
    }

    }
    catch(err) {
        catchErr(err,message);
    }

});

client.login (token);
