resource "aws_instance" "poke_app" {
  ami           = data.aws_ami.ubuntu.id
  instance_type =  "t3.micro"
  vpc_security_group_ids      = [aws_security_group.app_pokemon_sg.id]
  associate_public_ip_address = true
  key_name = "vockey"
  user_data = file("init_script.sh")
  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] /* Ubuntu Canonical owner*/

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_security_group" "app_pokemon_sg" {
  name        = "app_pokemon_sg"
  description = "PokeApp security group"
  ingress {
    description      = "HTTP from Anywhere"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  
  ingress {
    description      = "TLS from Anywhere"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }  

  ingress {
    description      = "Allow SSH from all VPC Private (Bad practice)"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["172.31.0.0/16","10.0.0.0/16"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  } 
}

