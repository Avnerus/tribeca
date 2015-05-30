console.log("MAIL IMPORT");
export default function(req, res) {
    console.log("Maik service!", req.body, req.params);
    res.writeHead(200, {'content-type': 'application/json'});
    res.end("{'status': 'OK'}");

    return;   
}
