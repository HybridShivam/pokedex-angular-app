output "instance_public_dns" {
    value = aws_instance.poke_app.public_dns
}