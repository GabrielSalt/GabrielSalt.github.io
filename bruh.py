def f(a,b,c,d, name):
    print(f"""else if (d.getAttribute('src').includes('{name}')) {{
        if (e.offsetX / d.offsetWidth > {a} / 957 && e.offsetX / d.offsetWidth < {b} / 957 & e.offsetY / d.offsetHeight > {c} / 762 & e.offsetY / d.offsetHeight < {d} / 762){{
            window.location.href = '/contact.html'
            return
       }}}}
    """)

f(60, 350, 645, 695, 'HST')