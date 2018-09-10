
<script type = 'text/javascript'>
    export default {
        filters:{
            link(item){
                return {path:'market/zone/child',query:{parentId:item[0] && item[0].parentSubject, childId: item[0] && item[0].id, zoneName:item[1]}}
            }
        }
    }
</script>