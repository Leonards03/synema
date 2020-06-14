module.exports = {
    html(string, ...args){
        let template = document.createElement('div')

        if(args){
            let temp = string.slice();
            args.forEach((arg, i) => {
                // temp[i] = temp[i] + data[arg];
                temp[i] += arg
            });
            template.innerHTML = temp.join('');
        }
        else
            template.innerHTML = string;
        
        return template;
    },
    css(string){
        let style = document.createElement('style')
        style.innerHTML = string;
        return style;
    }
}