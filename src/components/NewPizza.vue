<template>
  <form>
    <h3 class="text-muted my-5">新加的pizza</h3>
    <div class="form-group row">
      <label class="col-sm-1">品种</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.name" />
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">描述</label>
      <div class="col-sm-11">
        <textarea rows="5" class="form-control" v-model="newPizza.description" />
      </div>
    </div>
    <p><strong>选项1</strong></p>
    <div class="form-group row">
      <label class="col-sm-1">尺寸</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.size1" />
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">价格</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.price1" />
      </div>
    </div>
    <p><strong>选项2</strong></p>
    <div class="form-group row">
      <label class="col-sm-1">尺寸</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.size2" />
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">价格</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.price2" />
      </div>
    </div>
    <div class="form-group row">
      <button @click.prevent="addNewPizza" class="btn btn-success btn-block">提交</button>
    </div>
  </form>
</template>
<script>
  export default {
    data(){
      return{
        newPizza:{}
      }
    },
    methods:{
      addNewPizza(){
        let data={
          name:this.newPizza.name,
          description:this.newPizza.description,
          options:[{
            size:this.newPizza.size1,
            price:this.newPizza.price1
          },{
            size:this.newPizza.size2,
            price:this.newPizza.price2
          }

          ]
        }
        // fetch("https://pizza-planet-77967.firebaseio.com/menu.json",{
        //   method:"POST",
        //   headers:{
        //     "Content-type":'application/json'
        //   },
        //   body:JSON.stringify(data)
        // }).then(res => res.json()).then(data => this.$router.push({name:"menuLink"}))
        //   .catch(err => console.log(err))

        // this.http.post("menu.json",data).then(res => this.$router.push({name:"menuLink"}))

        // 数据同步到vuex中
        this.http.post("menu.json",data).then(res => this.$store.commit("addNewPizza",data))
      }
    }
  }

</script>

<style>

</style>
