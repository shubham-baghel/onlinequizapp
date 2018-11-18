import React,{Component} from 'react'

class LeftMenu extends  Component{
    render(){
        return(
            <div class="container-fluid">
            <div class="row"> 
               <div class="fixed-top mt-5 ml-4">
                   <div class="row m-1">
                      <div class="collapse" id="navbarToggleExternalContent">
                         <div class="bg-dark p-4">
                               <h5 class="text-white h4">Collapsed content</h5>
                               <span class="text-muted">Toggleable via the navbar brand.</span>
                               <h5 class="text-white h4">Collapsed content</h5>
                               <span class="text-muted">Toggleable via the navbar brand.</span>
                               <h5 class="text-white h4">Collapsed content</h5>
                               <span class="text-muted">Toggleable via the navbar brand.</span>
                               <h5 class="text-white h4">Collapsed content</h5>
                               <span class="text-muted">Toggleable via the navbar brand.</span>
                               <h5 class="text-white h4">Collapsed content</h5>
                               <span class="text-muted">Toggleable via the navbar brand.</span>
                           </div>
                    </div>
                   </div>
                 </div>  
            </div>
        </div>
        )
    }
}

export default LeftMenu;