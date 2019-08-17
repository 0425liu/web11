import store from "@/store"


const promission = {
    inserted(el,binding){
      console.log(el)
      const {value:pRoles} = binding;
      const roles = store.getters && store.getters.roles;
     
      if(pRoles && pRoles instanceof Array && pRoles.length >0){
        const hasPermission = roles.some(role=> pRoles.includes(role))
        
        if(!hasPermission){
          el.parentNode && el.parentNode.removeChild(el)
        }
      }else{

        throw new Error(`需要制定的按钮要求角色数组`)
      }

  }
}
export default promission;