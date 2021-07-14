document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  document.querySelector('#compose-form').onsubmit = function(){
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: document.querySelector('#compose-recipients').value,
          subject: document.querySelector('#compose-subject').value,
          body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        
        console.log(result);

      
  


    });
    load_mailbox('sent');
    return false;
  };
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
console.log("anil kumar")
  //show the mails in inbox

  fetch(`/emails/${mailbox}`)
.then(response => response.json())
.then(emails => {
    // Print emails
    console.log(emails)
    if(emails){
    emails.forEach(element => {
      console.log(element)
      if(mailbox == "inbox")
    {
      const item = document.createElement('div');
      console.log(element['read']);
      if(element['read'])
      {
        item.innerHTML =`<div style = "border: black solid 1px;background-color: rgb(230,230,230); "><span>${element.sender}</span><span style= "margin-left: 30px;">${element.subject}</span><span style = "float: right;">${element.timestamp}</span></div>`;
      
      }
      else{
        item.innerHTML =`<div style = "border: black solid 1px; "><span>${element.sender}</span><span style= "margin-left: 30px;">${element.subject}</span><span style = "float: right;">${element.timestamp}</span></div>`;
      
      }
      
      item.addEventListener('click',function(){
        console.log("abdjbdh");
        fetch(`/emails/${element.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              read: true
          })
        })
        
       
        const item1 = `<div><div><b>From: </b>${element.sender}</div><div><b>To: </b>${element.recipients}</div><div><b>Subject: </b>${element.subject}</div><div><b>Timestamp: </b>${element.timestamp}</div></div>`;
         
        const item2 = `<span><button class="btn btn-sm btn-outline-primary" id="reply">Reply</button></span>`;

        const item3 = `<div><p>${element.body}</p></div>`
        const item4 = `<span><button class="btn btn-sm btn-outline-primary" id="archive">Archive</button><hr></span>`


        document.querySelector('#emails-view').innerHTML = item1 + item2 + item4 + item3;

        document.querySelector('#archive').addEventListener('click',function(){
          
          
          fetch(`/emails/${element.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                archived: true
            })
          
          })
        load_mailbox('inbox');
        
        })


        document.querySelector('#reply').addEventListener('click',function(){
       const From = `From: <input disabled class="form-control" value="${document.querySelector('#from').value}" id="from-reply"> `;
       const To = `To: <input disabled class="form-control" value="${element.sender}" id="to-reply"> `;
       const subject =`<input  class="form-control" value="Re: ${element.subject}" id="subject-reply"> `;
       const body = `<textarea class="form-control" id="body-reply" placeholder="Body">On ${element.timestamp} ${element.sender} wrote: ${element.body}  </textarea>`;
       const submit = `<input type="submit" class="btn btn-primary" id="reply-1"/>`;

            

       document.querySelector('#emails-view').innerHTML = `<form id = "reply-form"> ${From} ${To}  ${subject}  ${body}  ${submit}  </form>`;
      

      document.querySelector('#reply-form').onsubmit = function(){
        console.log(document.querySelector('#to-reply').value)
      console.log(document.querySelector('#subject-reply').value)
      console.log(document.querySelector('#body-reply').value)
        fetch('/emails', {
          method: 'POST',
          body: JSON.stringify({
              recipients: document.querySelector('#to-reply').value,
              subject: document.querySelector('#subject-reply').value,
              body: document.querySelector('#body-reply').value
          })
        })
        .then(response => response.json())
        .then(result => {
            console.log("nackjsdbcjbsjcbsdjbcjhsbchbasdvcbsacjhbsdjhbjshbcjhsdbcbsdcb");
            console.log(result);
            
        });
        load_mailbox('sent');
         return false;         };
        });
        
      });
      
      document.querySelector('#emails-view').append(item);
      
    }


    else if(mailbox == "sent"){
      const item = document.createElement('div');
      item.innerHTML =`<div style = "border: black solid 1px; "><span>${element.sender}</span><span style= "margin-left: 30px;">${element.subject}</span><span style = "float: right;">${element.timestamp}</span></div>`;
      item.addEventListener('click',function(){
        const item1 = `<div><div><b>From: </b>${element.sender}</div><div><b>To: </b>${element.recipients}</div><div><b>Subject: </b>${element.subject}</div><div><b>Timestamp: </b>${element.timestamp}</div></div>`;
         
        
        const item2 = `<hr><div><p>${element.body}</p></div>`


        document.querySelector('#emails-view').innerHTML = item1 + item2;
      })
      document.querySelector('#emails-view').append(item);
      
    }
    else if (mailbox =="archive"){
      
      const item = document.createElement('div');
      console.log(element['read']);
      if(element['read'])
      {
        item.innerHTML =`<div style = "border: black solid 1px;background-color: rgb(230,230,230); "><span>${element.sender}</span><span style= "margin-left: 30px;">${element.subject}</span><span style = "float: right;">${element.timestamp}</span></div>`;
      
      }
      else{
        item.innerHTML =`<div style = "border: black solid 1px; "><span>${element.sender}</span><span style= "margin-left: 30px;">${element.subject}</span><span style = "float: right;">${element.timestamp}</span></div>`;
      
      }
      
      item.addEventListener('click',function(){
        console.log("abdjbdh");
        fetch(`/emails/${element.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              read: true
          })
        })
        
       
        const item1 = `<div><div><b>From: </b>${element.sender}</div><div><b>To: </b>${element.recipients}</div><div><b>Subject: </b>${element.subject}</div><div><b>Timestamp: </b>${element.timestamp}</div></div>`;
         
        const item2 = `<span><button class="btn btn-sm btn-outline-primary" id="reply">Reply</button></span>`;

        const item3 = `<div><p>${element.body}</p></div>`
        const item4 = `<span><button class="btn btn-sm btn-outline-primary" id="unarchive">Unarchive</button><hr></span>`


        document.querySelector('#emails-view').innerHTML = item1 + item2 + item4 + item3;

        document.querySelector('#unarchive').addEventListener('click',function(){
          
          
          fetch(`/emails/${element.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                archived: false
            })
          
          })
        
        load_mailbox('inbox');
        })


        document.querySelector('#reply').addEventListener('click',function(){
       const From = `From: <input disabled class="form-control" value="${document.querySelector('#from').value}" id="from-reply"> `;
       const To = `To: <input disabled class="form-control" value="${element.sender}" id="to-reply"> `;
       const subject =`<input  class="form-control" value="Re: ${element.subject}" id="subject-reply"> `;
       const body = `<textarea class="form-control" id="body-reply" placeholder="Body">On ${element.timestamp} ${element.sender} wrote: ${element.body} </textarea>`;
       const submit = `<input type="submit" class="btn btn-primary" id="reply-1"/>`;

            

       document.querySelector('#emails-view').innerHTML = `<form id = "reply-form"> ${From} ${To}  ${subject}  ${body}  ${submit}  </form>`;
      

      document.querySelector('#reply-form').onsubmit = function(){
        console.log(document.querySelector('#to-reply').value)
      console.log(document.querySelector('#subject-reply').value)
      console.log(document.querySelector('#body-reply').value)
        fetch('/emails', {
          method: 'POST',
          body: JSON.stringify({
              recipients: document.querySelector('#to-reply').value,
              subject: document.querySelector('#subject-reply').value,
              body: document.querySelector('#body-reply').value
          })
        })
        .then(response => response.json())
        .then(result => {
            console.log("nackjsdbcjbsjcbsdjbcjhsbchbasdvcbsacjhbsdjhbjshbcjhsdbcbsdcb");
            console.log(result);
            load_mailbox('sent');
        });

     return false; };
        });
        
      });
      
      document.querySelector('#emails-view').append(item);
    
    
    
    
    
    }
    });
    

    // ... do something else with emails ...
}
}
);
}