<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!--new pizza-->
      <NewPizza/>
    </div>
    <div class="col-sm-12 col-md-4">
      <!--品种展示-->
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table">
        <thead class="table table-default">
        <tr>
          <th>品种</th>
          <th>删除</th>
        </tr>
        </thead>
        <tbody v-for="item in getMenuItems">
        <tr>
          <td>{{item.name}}</td>
          <td>
            <button @click="deleteDatas(item)" class="btn btn-outline-danger btn-sm">&times;</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import NewPizza from "./NewPizza"
  export default {
    data() {
      return {
        name: "henry",
        // getMenuItems: {}
      }
    },
    components: {
      NewPizza
    },
    computed:{
      getMenuItems:{
        get(){
          // return this.$store.state.menuItems
          //通过getters获取数据
          return this.$store.getters.getMenuItems
        },
        post(){

        }

      }
    },
    created() {
      fetch("https://pizza-planet-77967.firebaseio.com/menu.json", {
        // headers:{
        //   "Content-type":'application/json'
        // },
        // body:JSON.stringify(data)
      }).then(res => res.json()).then(data => {
        let menuArry = []
        for (let key in data) {
          data[key].id = key
          menuArry.push(data[key])
        }
        // this.getMenuItems = menuArry
        this.$store.commit('setMenuItems',menuArry)
      })
    },
    methods: {
      deleteDatas(item) {
        fetch("https://pizza-planet-77967.firebaseio.com/menu/" + item.id + "/.json", {
          method: "DELETE",
          headers: {
            "Content-type": 'application/json'
          }
        }).then(res => res.json())
          // .then(data => this.$router.push({name:"menuLink"}))
          .then(data => {
            this.$store.commit("removeMenuItems",item)
          })
          .catch(err => console.log(err))
      }
    }
    //   beforeRouteEnter:(to, from, next) =>{
    //     // alert("hello " + this.name)
    //     next(vm => {
    //       alert("hello " + vm.name)
    //     })
    //   },
    //   beforeRouteLeave(to, from, next) {
    //     if (confirm("确认离开吗？") == true) {
    //       next()
    //     } else {
    //       next(false)
    //     }
    //   }
    //
  }
</script>
