 function template(){
    return `
    <div>
    <div style="display=flex;justify-content:center">
    <h3>Hello,<strong>{{name}}</strong> Welcome to a board</h3>
    <br/>
    <p>Your email address {{email}} kindly you will recieve all updates to this account</p>
    <p>We hope everything is fine. Thank you for signing up,we will always be with you</p>
    
    </div>
    <div style="display:grid;align-items:bottom">
    <p>Regards,</p>
    <br />
    <p>Team ECOM</p>
    </div>
    </div>
    `
}

module.exports=template