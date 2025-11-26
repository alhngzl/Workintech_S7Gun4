import { useEffect, useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useHistory } from 'react-router-dom'

export default function Login(){
    const history = useHistory();
    const [isValid, setIsValid] = useState(true);

    const [formData, setFormData] = useState(
        {
            email: "",
            password: "",
            term: false
        }
    );

    const [errors, setErrors] = useState(
        {
            email: false,
            password: false,
            term: false
        }
    );

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const validatePassword = (password) => {
        //Min 8, Upper, Lower, Number, Symbol(!)
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return regex.test(password)
    }

    const handleChange = (event) => {
        const { name, value, checked } = event.target;

        setFormData({ ...formData, [name]: value });

        if (name === "email") {
            if (validateEmail(value)) {
                setErrors({ ...errors, email: false });
            } else {
                setErrors({ ...errors, email: true });
            }
        }
        if (name === "password") {
            if (validatePassword(value)) {
                setErrors({ ...errors, password: false });
            } else {
                setErrors({ ...errors, password: true });
            }

        }
        if (name === "term") {
            setFormData({ ...formData, term: checked })
            if (checked) {
                setErrors({ ...errors, term: false });
            } else {
                setErrors({ ...errors, term: true });
            }

        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //axios

        history.push("/success");

    }

    useEffect(() => {
        if (validateEmail(formData.email) &&
            validatePassword(formData.password) &&
            formData.term === true) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }

        setIsValid(validateEmail(formData.email) && validatePassword(formData.password) && formData.term === true);
    }, [formData]);

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Mail Adresiniz"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        invalid={errors.email}
                    />
                    { errors.email && <FormFeedback> Mail adresini kontrol ediniz. </FormFeedback> }
                    
                </FormGroup>

                <FormGroup>
                    <Label for="password">
                        Parola
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Parolanız"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        invalid={errors.password}
                    />
                     { errors.password && <FormFeedback> Parola min 8, Büyük Harf, Küçük Harf, Sayı, Özel Karakter </FormFeedback> }
                </FormGroup>

                  <FormGroup>
                    <Label for="term">
                        Şartları kabul ediniz
                    </Label>
                    <Input
                        id="term"
                        name="term"
                        type="checkbox"
                        onChange={handleChange}
                        invalid = {errors.term}
                    />
                    { errors.term && <FormFeedback> Şartları kabul ediniz </FormFeedback> }
                </FormGroup>

                <Button disabled={!isValid} type="submit">Giriş Yap</Button>

            </Form>
        </>
    )
}