<template>
    <div>
        <small v-if="uncompletedTodos > 0" class="mt-2 d-flex justify-content-end"> Tamamlanmamış {{uncompletedTodos}} adet görev bulunuyor.</small>
        <small v-if="uncompletedTodos == 0" >Tüm görevler tamamlandı 🎆</small>
        <small v-else-if="completedTodos !== 0" class="mt-2 d-flex justify-content-end">{{completedTodos}} adet görev tamamlandı.</small>
    </div>

</template>

<script>
export default {
    props: ["completedTodos", "uncompletedTodos"],
  

}
</script>