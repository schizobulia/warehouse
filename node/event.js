const EventEmitter = require('events');
const Event = new EventEmitter();

/**
 * node中一个简单任务调度
 */
let State = {
    taskStatus: []
}

main()

function main() {

    // function fun() {
    //     console.log('a');
    // }

    // let t = setInterval(() => {
    //     addTask('task_1', fun);
    // }, 1000);


}

/**
 * 添加一个任务
 * @param {*} name 
 * @param {*} fun 
 */
function addTask(name, fun) {
    Event.on(name, fun);
    State.taskStatus.push({ name: name, status: 1 });
}

/**
 * 移除任务
 * @param {*} name 
 */
function removeTask(name) {
    Event.removeListener(name);
}

/**
 * 将任务暂停
 * @param {*} name 
 */
function waitTask(name) {

}

/**
 * 执行任务
 * @param {*} name 
 */
function runTask(name) {
    Event.emit(name)
}

/**
 * 修改任务状态
 * @param {*} name 
 * @param {*} status 
 */
function changeTaskStatus(name, status) {
    const index = arr.findIndex((ele) => {
        return ele.name === name;
    });
    if (index > -1) {
        State.taskStatus[index].status = status;
    }
}