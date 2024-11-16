export default function highlightString({ strTarget, subStr, className }) {
    var reg = new RegExp(subStr, 'gi');

    var marked_str = strTarget.replace(reg, function (str) { return '|[' + str + ']|'; });

    var arr = marked_str.split('|');

    var result = arr.map(function (s) {
        if (s.startsWith('[') && s.endsWith(']')) {
            s = s.replace(/\||\[|\]/g, '');
            return (<div className={`bg-slate-400 ${className}`}>{s}</div>);
        }
        else {
            return (<div className={className}>{s}</div>);
        }
    });
    if (result)
        return <div className={className}>{result}</div>;
    else
        return <div className={className}></div>;
}