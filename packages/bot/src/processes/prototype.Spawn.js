StructureSpawn.prototype.renewCreepsNextToSpawn = function (ticksToLive) {

    var renewStatus = undefined;
    const target = this.pos.findInRange(FIND_MY_CREEPS, 1, {
        filter: s => s.ticksToLive < ticksToLive
    })[0];


    if (target != undefined) {
        // skip renew if ignoreRenew == true
        if (target.memory.ignoreRenew == true) {
          //  console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] 1111111111111111111 skipping renewing target: ' + target + '</>');

            return renewStatus;
        }

        // console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] RenewCreep target is ' + target + '</>');
        renewStatus = this.renewCreep(target);
    }
    return renewStatus;
};
